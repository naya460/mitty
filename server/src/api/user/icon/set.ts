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
import setUserIcon from "database/user/icon/set";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const setIconSchema = {
  type: 'object',
  properties: {
    icon: { type: 'string' },
  },
  required: [
    'icon',
  ],
};

export const setIconRoute: UseRouteHandlerMethod<{
  Body: {
    icon: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(400);
    return;
  }

  const fileData = req.body.icon.replace(/^data:\w+\/\w+;base64,/, '');
  const image = Buffer.from(fileData, 'base64');
  
  setUserIcon(auth.user_id, image);

  res.status(200);
  return;
}
