import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsed_url = parse(req.url, true);

      await handle(req, res, parsed_url);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  });

  const wss = new WebSocketServer({ port: 8080, verifyClient: async (info, cb) => {
    const c = await prisma.user.findMany({
      select: {
        cookie: true
      },
      where: {
        cookie: info.req.headers.cookie.split('=')[1]
      }
    });
    cb(c.length != 0);
  } });

  wss.on('connection', (ws, socket) => {
    console.log('websocket: connection to', socket.socket.remoteAddress);
    ws.on('message', (data) => {
      console.log('received: %s', data);
    });

    ws.send('something');
  });
});