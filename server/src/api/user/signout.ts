import { Redis } from "ioredis";

import { UseRouteHandlerMethod } from "common/use_route_handler";

const redis = new Redis();

export const signoutRoute: UseRouteHandlerMethod = async (req, res) => {
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
