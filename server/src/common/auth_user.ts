import { FastifyReply, FastifyRequest } from "fastify";
import redis from "lib/redis";

export default async function authUser(
  req: FastifyRequest,
  res: FastifyReply
): Promise<
  null | { session_id: string, user_name: string }
> {
  // cookieを取得
  const session_id = req.cookies.session_id;
  if (!session_id) {
    res.status(400);
    return null;
  }

  // 認証する
  const user_name = await redis.hget('session', session_id);
  if (!user_name) {
    res.status(400);
    return null;
  }

  return { session_id, user_name };
}
