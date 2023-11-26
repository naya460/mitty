import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import getGroup from "database/group/get";

export const getGroupRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // グループの一覧を取得する
  const groups = await getGroup(auth.user_id);
  if (groups === undefined) {
    res.status(400);
    return;
  }

  res.status(200).type('application/json');
  return await JSON.parse(groups);
}
