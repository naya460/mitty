import { UseRouteHandlerMethod } from "lib/use_route_handler";

import authUser from "common/auth_user";

export const getUserNameRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(200);
    return null
  };

  // ログイン中のユーザー名を返す
  res.status(200).type('application/json');
  return { user_name: auth.user_name }
}
