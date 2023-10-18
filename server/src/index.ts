import fastify from 'fastify';
import { v4 as uuid_v4 } from 'uuid';
import fastifyCookie from '@fastify/cookie';

const server = fastify({
  logger: true,
});

server.register(fastifyCookie, {
  secret: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
});

server.get('/', async (request, reply) => {
  console.log(request.cookies);
  reply
    .setCookie('session-id', uuid_v4(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .type('application/json').code(200)
    .send({ test: 'ok' });
});

server.listen({ port: 9090, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
