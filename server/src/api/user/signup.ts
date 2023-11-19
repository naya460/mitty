import bcrypt from "bcrypt";
import { v4 as uuid_v4 } from 'uuid';
import redis from "lib/redis";

import getUserId from "database/user/get_user_id";
import createUser from "database/user/create";
import setUserCookie from "database/user/set_cookie";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const signupBodySchema = {
  type: 'object',
  properties: {
    user_name: { type: 'string' },
    password: { type: 'string' },
    confirm_password: { type: 'string' },
  },
  required: [
    'user_name',
    'password',
    'confirm_password',
  ],
};

export const signupRoute: UseRouteHandlerMethod<{
  Body: {
    user_name: string,
    password: string,
    confirm_password: string
  }
}> = async (req, res) => {
  // ユーザーが存在しないことを確認
  const user_id = await getUserId(req.body.user_name);
  if (user_id) {
    res.status(400);
    return;
  }

  // パスワードが一致しているか確認
  if (req.body.password !== req.body.confirm_password) {
    res.status(500);
    return;
  }

  // ユーザーを作成
  const hash = await bcrypt.hash(req.body.password, 10);
  await createUser(req.body.user_name, hash);

  // セッションIDを生成
  const session_id = uuid_v4();

  // cookieを設定
  res.setCookie('session_id', session_id, { path: '/', httpOnly: true });

  // session_idを保存
  await setUserCookie(req.body.user_name, session_id);
  await redis.hset('session', session_id, req.body.user_name);

  res.status(201);
}
