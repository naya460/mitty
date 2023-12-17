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
import prisma from "lib/prisma";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const renameBodySchema = {
  type: 'object',
  properties: {
    new_name: { type: 'string' },
  },
  required: [
    'new_name',
  ],
};

export const renameRoute: UseRouteHandlerMethod<{
  Body: {
    new_name: string,
  },
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(400);
    return null;
  }

  // ユーザーの表示名を変更
  await prisma.user.update({
    where: {
      user_id: auth.user_id,
    },
    data: {
      display_name: req.body.new_name,
    },
  });

  res.status(200);
  return;
}
