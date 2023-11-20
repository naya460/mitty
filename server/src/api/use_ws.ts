import authUser from "common/auth_user";
import redis from "lib/redis";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import { v4 as uuid_v4 } from "uuid";

export const useWsRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // ws_idを生成
  const ws_id = uuid_v4();

  // ws_idを保存
  await redis.hset('ws', ws_id, auth.session_id);

  res.status(200).type('application/json');
  return { ws_id };
}
