import fastify from 'fastify';

const server = fastify({
  logger: true,
});

server.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return { test: 'ok' };
});

server.listen({ port: 9090, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
