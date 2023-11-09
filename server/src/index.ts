import fastify from 'fastify';
import { v4 as uuid_v4 } from 'uuid';
import fastifyCookie from '@fastify/cookie';
import { Redis } from 'ioredis';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

import databaseRoutes from 'database';

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

server.post<{ Body: { user_name: string } }>(
  '/user/signin',
  async (req, res) => {
    // ユーザー名を取得
    const user_name = req.body.user_name;

    // uuid v4 を生成
    const session_id = uuid_v4();
    
    // session id と user_name を保存する
    await redis.hset('session', session_id, user_name);

    console.log(await redis.hgetall('session'));

    // session id を返す
    res.type('application/json').code(201);
    return { session_id };
  }
);

server.post<{ Body: { session_id: string} }>(
  '/user/signout',
  async (req, res) => {
    const session_id = (await JSON.parse(req.body.session_id)).session_id;
    await redis.hdel('session', session_id);
    res.code(200);
  }
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
