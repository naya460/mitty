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
import addGroupMember from "database/group/member/add";
import getUserId from "database/user/get_user_id";

export const addGroupMemberBodySchema = {
  type: 'object',
  properties: {
    group_id: { type: 'string' },
    add_user_name: { type: 'string' },
  },
  required: [
    'group_id',
    'add_user_name',
  ],
};

export const addGroupMemberRoute: UseRouteHandlerMethod<{
  Body: {
    group_id: string,
    add_user_name: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // 追加されるユーザーIDを取得
  const add_user_id = await getUserId(req.body.add_user_name);
  if (add_user_id === undefined) {
    res.status(400);
    return;
  }

  // ユーザーを追加
  const is_success = await addGroupMember(
    auth.user_id,
    add_user_id,
    req.body.group_id
  );
  if (is_success === false) {
    res.status(400);
    return;
  }

  res.status(201);
}
