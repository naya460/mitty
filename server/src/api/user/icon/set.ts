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

import { Canvas, Image } from "canvas";
import authUser from "common/auth_user";
import setUserIcon from "database/user/icon/set";
import redis from "lib/redis";
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

  // 画像が正常に読み込めるか確認
  const verified_image = await new Promise<Buffer | null>((resolve) => {
    const image = new Image();
    image.dataMode = Image.MODE_IMAGE | Image.MODE_MIME;
    // エラー時の処理
    image.onerror = () => resolve(null);
    // 読み込み時に比率を判定
    image.onload = () => {
      if (image.naturalHeight === 256 && image.naturalWidth === 256) {
        // Bufferに変換
        const canvas = new Canvas(256, 256);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        resolve(canvas.toBuffer('image/jpeg'));
      }
      resolve(null);
    }
    // 画像を設定
    image.src = req.body.icon;
  });
  if (verified_image === null) {
    res.status(400);
    return;
  }
  
  // アイコンに設定
  await setUserIcon(auth.user_id, verified_image);

  // 配信
  redis.publish('api/user/icon/set', JSON.stringify({
    user_id: auth.user_id,
    icon: verified_image.toString('base64'),
  }));

  res.status(200);
  return;
}
