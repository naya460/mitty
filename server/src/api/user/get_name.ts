import { UseRouteHandlerMethod } from "lib/use_route_handler";

import authUser from "common/auth_user";
import getUserId from "database/user/get_user_id";

export const getUserNameRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(200);
    return null
  };

  // ユーザーIDを取得
  const user_id = await getUserId(auth.user_name);

  // ログイン中のユーザー名を返す
  res.status(200).type('application/json');
  return { user_name: auth.user_name, user_id }
}
