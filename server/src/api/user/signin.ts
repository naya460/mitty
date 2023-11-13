import { FastifyReply, FastifyRequest } from "fastify";
import { v4 as uuid_v4 } from 'uuid';
import bcrypt from "bcrypt";
import { Redis } from 'ioredis'

import getUserHash from "database/user/get_hash";
import setUserCookie from "database/user/set_cookie";

const redis = new Redis();

type signinBody = {
  Body: {
    user_name: string,
    password: string,
  }
};

export const signinBodySchema = {
  type: 'object',
  properties: {
    user_name: { type: 'string' },
    password: { type: 'string' },
  },
  required: [
    'user_name',
    'password',
  ],
};

export default async function signinRoute(
  req: FastifyRequest<signinBody>,
  res: FastifyReply
) {
  
  // ハッシュを取得
  const hash = await getUserHash(req.body.user_name);
  if (!hash) {
    res.status(400);
    return;
  }

  // ユーザーを認証する
  const result = await bcrypt.compare(req.body.password, hash);

  if (result) {
    // セッションIDを生成
    const session_id = uuid_v4();

    // cookieを設定
    res.setCookie('session_id', session_id, { path: '/', httpOnly: true });

    // session_idを保存
    await setUserCookie(req.body.user_name, session_id);
    await redis.hset('session', session_id, req.body.user_name);

    res.status(200);
  } else {
    res.status(400);
  }

  return;
}
