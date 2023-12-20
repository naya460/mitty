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

import { createCanvas } from "canvas";
import authUser from "common/auth_user";
import getUserIcon from "database/user/get_icon";
import setUserIcon from "database/user/set_icon";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import md5 from "md5";

export const getIconRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(400);
    return;
  }

  // アイコンを入手
  const icon = await getUserIcon(auth.user_id);
  if (icon === null) {
    res.status(400);
    return;
  }

  // アイコンがある場合
  if (icon !== null) {
    res.status(200).type('image/jpeg');
    return icon;
  }

  // 画像を生成
  const canvas = createCanvas(255, 255);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 256, 256);

  const hash = md5(auth.user_id);

  const color = parseInt(hash[0], 16) * 16 + parseInt(hash[1], 16) * 360 / 256;
  ctx.fillStyle = `hsl(${color} 90% 45%)`;

  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 5; ++j) {
      if (parseInt(hash[i * 3 + j + 2], 16) % 2) {
        ctx.fillRect(53 + i * 30, 53 + j * 30, 30, 30);
        ctx.fillRect(173 - i * 30, 53 + j * 30, 30, 30);
      }      
    }
  }

  const image = canvas.toBuffer('image/jpeg');

  // identiconを保存
  setUserIcon(auth.user_id, image);

  res.status(200).type('image/jpeg');
  return image;
}
