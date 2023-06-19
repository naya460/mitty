import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

      ws.send('user : ' + user[0].user_name);
      ws.send('group : ' + json_message.group_id);
      ws.send('message : ' + json_message.message);
    });
  
    ws.send('something');
  });

  return wss;
}