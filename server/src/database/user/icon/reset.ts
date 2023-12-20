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
import md5 from "md5";

import setUserIcon from "database/user/icon/set";

export default async function resetUserIcon(
  user_id: string,
): Promise<Buffer> {
  // identiconを生成
  const canvas = createCanvas(255, 255);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 256, 256);

  const hash = md5(user_id);

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

  const icon = canvas.toBuffer('image/jpeg');

  // identiconを保存
  await setUserIcon(user_id, icon);

  return icon;
}
