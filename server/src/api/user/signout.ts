import { Redis } from "ioredis";

import { UseRouteHandlerMethod } from "lib/use_route_handler";
import authUser from "common/auth_user";

const redis = new Redis();

export const signoutRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // セッションを削除
  res.clearCookie('session_id');
  redis.hdel('session', auth.session_id);

  return;
}
