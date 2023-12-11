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

import bcrypt from "bcrypt";
import { v4 as uuid_v4 } from 'uuid';
import redis from "lib/redis";

import getUserId from "database/user/get_user_id";
import createUser from "database/user/create";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import prisma from "lib/prisma";

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

  // ユーザーIDを取得
  const new_user_id = await getUserId(req.body.user_name);
  if (new_user_id === undefined) {
    res.status(400);
    return;
  }

  // session_idを保存
  await redis.hset('session', session_id, new_user_id);

  res.status(201);
}
