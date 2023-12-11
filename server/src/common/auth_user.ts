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

import { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/cookie"
import redis from "lib/redis";

export default async function authUser(
  req: FastifyRequest,
  res: FastifyReply
): Promise<
  null | { session_id: string, user_id: string }
> {
  // cookieを取得
  const session_id = req.cookies.session_id;
  if (!session_id) {
    res.status(400);
    return null;
  }

  // 認証する
  const user_id = await authUserSession(session_id);
  if (!user_id) {
    res.status(400);
    return null;
  }

  return { session_id, user_id };
}

export async function authUserSession(
  session_id: string
): Promise<string | null> {
  return await redis.hget('session', session_id);
}
