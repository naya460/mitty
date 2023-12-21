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

import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import redis from "lib/redis";

export const sendMessageBodySchema = {
  type: 'object',
  properties: {
    message_text: { type: 'string' },
    group_id: { type: 'string' },
  },
  required: [
    'message_text',
    'group_id',
  ],
};

export const sendMessageRoute: UseRouteHandlerMethod<{
  Body: {
    message_text: string,
    group_id: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // メッセージの追加と配信
  await redis.publish('api/message/send', JSON.stringify({
    user_id: auth.user_id,
    group_id: req.body.group_id,
    message_text: req.body.message_text,
  }));

  res.status(201);
}
