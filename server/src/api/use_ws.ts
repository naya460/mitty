import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "common/use_route_handler";
import setUserCookie from "database/user/set_cookie";

export const useWsRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // session_idを保存
  await setUserCookie(auth.user_name, auth.session_id);

  res.status(200).type('application/json');
  return { session_id: auth.session_id };
}
