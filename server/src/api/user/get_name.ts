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

import { UseRouteHandlerMethod } from "lib/use_route_handler";

import authUser from "common/auth_user";
import getUserDisplayName from "database/user/get_display_name";

export const getUserNameRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(200);
    return null
  };

  // ユーザー名を取得
  const display_name = await getUserDisplayName(auth.user_id);

  // ログイン中のユーザー名を返す
  res.status(200).type('application/json');
  return { display_name }
}
