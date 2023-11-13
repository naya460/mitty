import { FastifyReply, FastifyRequest } from "fastify";
import { Redis } from "ioredis";

import "@fastify/cookie";

const redis = new Redis();

export default async function signoutRoute(
  req: FastifyRequest,
  res: FastifyReply
) {
  // cookieを取得
  const session_id = req.cookies.session_id;
  if (!session_id) {
    res.status(400);
    return;
  }

  // 認証する
  const user_name = await redis.hget('session', session_id);
  if (!user_name) {
    res.status(400);
    return;
  }

  // セッションを削除
  res.clearCookie('session_id');
  redis.hdel('session', session_id);

  return;
}
