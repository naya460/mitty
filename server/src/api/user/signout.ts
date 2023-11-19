import redis from "lib/redis";

import { UseRouteHandlerMethod } from "lib/use_route_handler";
import authUser from "common/auth_user";

export const signoutRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // セッションを削除
  res.clearCookie('session_id');
  redis.hdel('session', auth.session_id);

  return;
}
