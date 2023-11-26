import { UseRouteHandlerMethod } from "lib/use_route_handler";

import authUser from "common/auth_user";
import getUserDisplayName from "database/user/get_display_name";

export const getUserNameRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(200);
    return null
  };

  // ユーザー名を取得
  const display_name = await getUserDisplayName(auth.user_id);

  // ログイン中のユーザー名を返す
  res.status(200).type('application/json');
  return { display_name }
}
