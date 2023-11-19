import { FastifyInstance } from "fastify";
import { WebSocketServer } from 'ws';
import { Redis } from "ioredis";
import prisma from 'lib/prisma';

import addMessage from "database/message/add";

const redis = new Redis();

const clients = new Map();

export function createWebSocketServer(server: FastifyInstance) {
  const wss = new WebSocketServer(server);

  wss.on('connection', (ws) => {
    ws.on('error', console.error);
    
    ws.on('message', async (data) => {
      const json_message = await JSON.parse(data.toString());

      // ユーザーを認証
      const user_name = await redis.hget('session', json_message.cookie);
      if (user_name === null) return;

      if (clients.get(json_message.cookie) === undefined) {
        clients.set(json_message.cookie, ws);
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
              cookie: true
            }
          }
        },
        where: {
          group_id: group_id
        }
      });

      // メッセージをメンバーに送信
      member_cookie.forEach((data) => {
        const ws = clients.get(data.user.cookie);
        if (ws) {
          ws.send(JSON.stringify({
            message_text: message_text,
            author: {
              user_name: user_name,
            },
            group_id: group_id,
            time: new Date()
          }));
        }
      });
    });
  });
}
