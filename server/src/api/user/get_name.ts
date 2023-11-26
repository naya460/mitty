import { UseRouteHandlerMethod } from "lib/use_route_handler";

import authUser from "common/auth_user";
import getUserId from "database/user/get_user_id";
import prisma from "lib/prisma";

export const getUserNameRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(200);
    return null
  };

  // ユーザー名を取得
  const user_name = (await prisma.user.findUnique({
    select: {
      user_name: true,
    },
    where: {
      user_id: auth.user_id,
    },
  }))?.user_name;

  // ログイン中のユーザー名を返す
  res.status(200).type('application/json');
  return { user_name: user_name, user_id: auth.user_id }
}
