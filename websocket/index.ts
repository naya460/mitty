import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const clients = new Map();

export function CreateWebSocketServer() {
  const wss = new WebSocketServer({
    port: 8080,
    verifyClient: async (info, cb) => {
      const c = await prisma.user.findMany({
        select: {
          cookie: true
        },
        where: {
          cookie: info.req.headers.cookie.split('=')[1]
        }
      });
      cb(c.length != 0);
    }
  });
  
  wss.on('connection', (ws, socket) => {
    console.log('websocket: connection to', socket.socket.remoteAddress);

    clients.set(socket.headers.cookie.split('=')[1], ws);
    console.log(clients.keys())

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
      await prisma.message.create({
        data: {
          message_text: message_text,
          author_id: user[0].user_id,
          group_id: group_id
        }
      });
    });
  });

  return wss;
}