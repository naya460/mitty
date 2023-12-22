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
import getUserIcon from "database/user/icon/get";
import resetUserIcon from "database/user/icon/reset";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const getIconSchema = {
  type: 'object',
  properties: {
    user_id: { type: 'string' },
  },
};

export const getIconRoute: UseRouteHandlerMethod<{
  Body: {
    user_id?: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(400);
    return;
  }

  // アイコンを入手
  const icon = await getUserIcon(
    (req.body.user_id === undefined)? auth.user_id : req.body.user_id
  );

  // アイコンがある場合
  if (icon !== null) {
    res.status(200).type('image/jpeg');
    return icon;
  }

  const identicon = await resetUserIcon(
    (req.body.user_id === undefined)? auth.user_id : req.body.user_id
  );

  res.status(200).type('image/jpeg');
  return identicon;
}
