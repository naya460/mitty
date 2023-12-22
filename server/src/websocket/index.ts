// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { FastifyInstance } from "fastify";
import { WebSocketServer } from 'ws';
import redis from "lib/redis";

import { authUserSession } from "common/auth_user";
import { wsSubscribeRoute } from "./subscribe";
import subscribeMessageSend from "./message/send";
import subscribeGroupCreate from "./group/create";
import subscribeGroupMemberAdd from "./group/member/add";

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
    const user_id = await authUserSession(session_id);
    if (user_id === null) {
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

      // ユーザーIDを取得
      const user_id = await redis.hget('session', ws_id);
      if (user_id === null) return;

      // ルーティング
      if (json_message.route === 'subscribe') {
        wsSubscribeRoute(user_id, ws_id, ws);
        return;
      }
    });
  });

  // redisのsubscribe
  subscribeMessageSend();
  subscribeGroupCreate();
  subscribeGroupMemberAdd();
}
