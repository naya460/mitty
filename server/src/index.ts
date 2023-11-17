import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import databaseRoutes from 'database';
import apiRoutes from 'api';

import 'redis/index'

const server = fastify({
  logger: true,
});

server.register(fastifyCookie, {
  secret: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
});

server.register(cors, {
  origin: true,
  credentials: true,
});

server.register(apiRoutes);

server.register(databaseRoutes, { prefix: '/database' });

server.listen({ port: 9090, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
