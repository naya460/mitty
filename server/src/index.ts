import fastify from 'fastify';
import { v4 as uuid_v4 } from 'uuid';
import fastifyCookie from '@fastify/cookie';
import { Redis } from 'ioredis';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

import databaseRoutes from 'database';
import signinRoute, { signinBodySchema } from 'api/user/signin';
import signoutRoute from 'api/user/signout';
import signupRoute, { signupBodySchema } from 'api/user/signup';

const prisma = new PrismaClient();

const server = fastify({
  logger: true,
});

const redis = new Redis();

server.register(fastifyCookie, {
  secret: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
});

server.register(cors, {
  origin: true,
  credentials: true,
});

server.register(databaseRoutes, { prefix: '/database' });

server.get('/', async (request, reply) => {
  console.log(await prisma.user.findMany({select: {user_name: true}}));
  reply
    .setCookie('session-id', uuid_v4(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .type('application/json').code(200)
    .send({ test: 'ok' });
});

server.post(
  '/user/signin',
  { schema: { body: signinBodySchema } },
  signinRoute
);

server.get(
  '/user/signout',
  signoutRoute
);

server.post(
  '/user/signup',
  { schema: { body: signupBodySchema } },
  signupRoute
);

server.get(
  '/tmp',
  async (req, res) => {
    res.type('application/json');
    res.setCookie('tmp', 'ok');
    return { tmp: 'ok!' };
  }
);

server.listen({ port: 9090, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
