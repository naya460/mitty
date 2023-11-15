import { UseRouteHandlerMethod } from "common/use_route_handler";
import { Redis } from "ioredis";

const redis = new Redis();

export const getUserNameRoute: UseRouteHandlerMethod = async (req, res) => {
  // cookieを取得
  const session_id = req.cookies.session_id;
  if (!session_id) {
    res.status(200).type('application.json');
    return null;
  }

  // 認証する
  const user_name = await redis.hget('session', session_id);
  if (!user_name) {
    res.status(200).type('application/json');
    return null;
  }

  // ログイン中のユーザー名を返す
  res.status(200).type('application/json');
  return { user_name }
}