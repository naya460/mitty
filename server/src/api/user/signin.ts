// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { v4 as uuid_v4 } from 'uuid';
import bcrypt from "bcrypt";
import redis from 'lib/redis';

import getUserHash from "database/user/get_hash";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import prisma from 'lib/prisma';

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

export const signinRoute: UseRouteHandlerMethod<{
  Body: {
    user_name: string,
    password: string,
  }
}> = async (req, res) => {
  // ログインに制限が掛かっているとき無視
  if (await redis.exists(`stop_signin_:_${req.body.user_name}`) === 1) {
    res.status(400);
    return;
  }

  // ユーザーIDを取得
  const user_id = (await prisma.user.findUnique({
    select: {
      user_id: true,
    },
    where: {
      user_name: req.body.user_name,
    },
  }))?.user_id;
  if (user_id === undefined) {
    res.status(400);
    return;
  }

  // ハッシュを取得
  const hash = await getUserHash(user_id);
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
    await redis.hset('session', session_id, user_id);

    // サインインの試行回数をリセット
    redis.hdel('try_signin', req.body.user_name);

    res.status(200);
  } else {
    // このユーザーのサインイン試行回数を増やす
    const num = await redis.hincrby('try_signin', req.body.user_name, 1);

    // 10回間違えたとき、1時間の時間制限を掛ける
    if (num >= 10) {
      await redis.set(`stop_signin_:_${req.body.user_name}`, 1);
      await redis.expire(`stop_signin_:_${req.body.user_name}`, 3600);
      await redis.hdel('try_signin', req.body.user_name);
    }

    res.status(400);
  }

  return;
}
