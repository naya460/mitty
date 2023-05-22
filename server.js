const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { WebSocketServer } = require('ws')

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

    const wss = new WebSocketServer({ noserver: true, port: 8080 });

    wss.on('connection', (ws) => {
      console.log('connection', ws);
      ws.on('message', (data) => {
        console.log('received: %s', data);
      });

      ws.send('something');
    });

  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
});