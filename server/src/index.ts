import fastify from 'fastify';
import { v4 as uuid_v4 } from 'uuid';
import fastifyCookie from '@fastify/cookie';
import { Redis } from 'ioredis';

const server = fastify({
  logger: true,
});

const redis = new Redis();

server.register(fastifyCookie, {
  secret: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
});

server.get('/', async (request, reply) => {
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
    redis.hset('session', session_id, user_name);

    console.log(await redis.hgetall('session'));

    // session id を返す
    res.type('application/json').code(200);
    return { session_id };
  }
);

server.listen({ port: 9090, host: '127.0.0.1' }, (err, address) => {
  if (err) throw err;
  server.log.info(`server listening on ${address}`);
});
