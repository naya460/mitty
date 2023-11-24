import { FastifyInstance } from "fastify";
import { WebSocket, WebSocketServer } from 'ws';
import redis from "lib/redis";

import { authUserSession } from "common/auth_user";
import wsSendMessageRoute from "./message/send";

const clients = new Map<string, {ws_id: string, ws: WebSocket}[]>();

export function createWebSocketServer(server: FastifyInstance) {
  const wss = new WebSocketServer(server);

  server.server.on('upgrade', async (req, socket) => {
    // クッキーを取得
    const cookies = req.headers.cookie?.split('; ');
    
    // session_idを取り出す
    const session_id = (() => {
      let session_id = '';
      cookies?.forEach((value) => {
        const values = value.split('=');
        if (values[0] === 'session_id') {
          session_id = values[1];
        }
      });
      return session_id;
    })();

    // 認証する
    const user_name = await authUserSession(session_id);
    if (user_name === null) {
      socket.end();
      return;
    }
  });

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
      if (clients.get(user_name)?.find((data) => {data.ws_id === ws_id}) === undefined) {
        const tmp = clients.get(user_name);
        if (tmp === undefined) {
          clients.set(user_name, [ { ws_id, ws } ]);
        } else {
          tmp.push({ ws_id, ws });
          clients.set(user_name, tmp);
        }
      }

      // ルーティング
      if (json_message.type === 'message/send') {
        wsSendMessageRoute(json_message, user_name, clients);
        return;
      }
    });
  });
}
