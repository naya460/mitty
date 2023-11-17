import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
const prisma = new PrismaClient();

const clients = new Map();
const send_redis = new Redis();
const get_redis = new Redis();

export function CreateWebSocketServer() {
  const wss = new WebSocketServer({port: 8080});
  
  wss.on('connection', (ws, socket) => {
    console.log('websocket: connection to', socket.socket.remoteAddress);

    ws.on('message', async (data) => {
      const json_message = JSON.parse(data.toString());
      
      // cookieからuserを検索
      const cookie: string = json_message.cookie;
      const user = await prisma.user.findMany({
        where: {
          cookie: cookie
        }
      });
      if (user.length != 1) return;

      if (!clients.get(cookie)) {
        clients.set(cookie, ws);
      }

      // グループIDを取得
      const group_id: string = json_message.group_id;
      if (group_id === null) {
        return;
      }

      // グループに所属しているか確認
      const is_belong = await prisma.groupsOnUsers.findUnique({
        where: {
          user_id_group_id: {
            user_id: user[0].user_id,
            group_id: group_id
          }
        }
      }) != null;
      if (!is_belong) {
        return;
      }

      // メッセージを取り出す
      const message_text: string = json_message.message;
      if (message_text == null) {
        return;
      }

      // メッセージを追加
      send_redis.publish(
        "send_message_ws",
        JSON.stringify({
          message_text: message_text,
          author_name: user[0].user_name,
          group_id: group_id
        })
      );

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

      // メッセージを送信
      member_cookie.forEach((data) => {
        const ws = clients.get(data.user.cookie);
        if (ws) {
          // ws.send(message_text);
          ws.send(JSON.stringify({
            message_text: message_text,
            author: {
              user_name: user[0].user_name
            },
            group_id: group_id,
            time: new Date()
          }))
        }
      })
    });
  });

  return wss;
}
