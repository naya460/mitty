import fastify from 'fastify';
import { v4 as uuid_v4 } from 'uuid';

const server = fastify({
  logger: true,
});

server.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return { uuid: uuid_v4() };
});

server.listen({ port: 9090, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
