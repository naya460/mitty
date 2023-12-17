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
import prisma from "lib/prisma";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const getIconRoute: UseRouteHandlerMethod = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) {
    res.status(400);
    return;
  }

  // 表示名を入手
  const name = (await prisma.user.findUnique({
    select: {
      display_name: true,
    },
    where: {
      user_id: auth.user_id,
    },
  }))?.display_name;
  if (name === undefined) {
    res.status(400);
    return;
  }

  // 画像を生成
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 256, 256);

  const text = name[0];
  ctx.font = "192px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText(text, ctx.measureText(text).width / 2, 208);

  const image = canvas.toBuffer('image/jpeg');

  console.log(image);
  res.status(200).type('image/jpeg');
  return image;
}
