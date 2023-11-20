import { FastifyInstance } from "fastify";
import { WebSocket, WebSocketServer } from 'ws';
import redis from "lib/redis";
import prisma from 'lib/prisma';

import addMessage from "database/message/add";

const clients = new Map<string, {ws_id: string, ws: WebSocket}[]>();

export function createWebSocketServer(server: FastifyInstance) {
  const wss = new WebSocketServer(server);

  wss.on('connection', (ws) => {
    ws.on('error', console.error);
    
    ws.on('message', async (data) => {
      const json_message = await JSON.parse(data.toString());

      // ユーザーを認証
      const ws_id = await redis.hget('ws', json_message.ws_id);
      if (ws_id === null) return;

      // ユーザー名を取得
      const user_name = await redis.hget('session', ws_id);
      if (user_name === null) return;

      // 配信先として登録
      if (clients.get(user_name)?.find((data) => data.ws_id === ws_id) === undefined) {
        const tmp = clients.get(user_name);
        if (tmp === undefined) {
          clients.set(user_name, [ { ws_id, ws } ]);
        } else {
          tmp.push({ ws_id, ws });
          clients.set(user_name, tmp);
        }
      }

      // グループIDがあるか確認
      const group_id = json_message.group_id;
      if (group_id === undefined) return;

      // メッセージがあるか確認
      const message_text = json_message.message;
      if (message_text === undefined) return;

      // メッセージを追加
      const success = await addMessage(user_name, group_id, message_text);
      if (success === false) {
        return;
      }

      // グループのメンバーのクッキーを取得
      const member_cookie = await prisma.groupsOnUsers.findMany({
        select: {
          user: {
            select: {
              user_name: true,
            }
          }
        },
        where: {
          group_id: group_id
        }
      });

      // メッセージをメンバーに送信
      member_cookie.forEach((data) => {
        // ユーザーのwsの一覧を取得
        const ws_list = clients.get(data.user.user_name);
        // wsが無いとき次のユーザーへ
        if (ws_list === undefined) return;

        // 全てのwsに配信する
        ws_list.forEach((local_ws) => {
          local_ws.ws.send(JSON.stringify({
            message_text: message_text,
            author: {
              user_name: user_name,
            },
            group_id: group_id,
            time: new Date()
          }));
        });
      });
    });
  });
}
