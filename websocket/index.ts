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
    ws.on('message', (data) => {
      const json_message = JSON.parse(data.toString());
      
    });
  
    ws.send('something');
  });

  return wss;
}