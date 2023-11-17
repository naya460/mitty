import { FastifyInstance } from "fastify";
import { WebSocketServer } from 'ws';

export function createWebSocketServer(server: FastifyInstance) {
  const wss = new WebSocketServer(server);

  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data) => {
      console.log('data');
    });

    ws.send('something');
  });
}
