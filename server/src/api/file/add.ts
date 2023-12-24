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
import addFile from "database/file/add";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const addFileSchema = {
  type: 'object',
  properties: {
    group_name: { type: 'string' },
  },
  required: [
    'file',
  ],
};

export const addFileRoute: UseRouteHandlerMethod<{
  Body: {
    file: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // ファイル形式を取り出す
  const mime = req.body.file.split(':')[1].split(';')[0];
  const mime_type = mime.split('/')[0];

  // ファイルを検証する
  const verified = await new Promise<Buffer | null>((resolve) => {
    switch (mime_type) {
      // 画像
      case 'image': {
        const image = new Image();
        image.dataMode = Image.MODE_IMAGE | Image.MODE_MIME;
        // エラー時の処理
        image.onerror = () => resolve(null);
        // 読み込み時の処理
        image.onload = () => {
          // Bufferに変換
          const canvas = new Canvas(image.naturalWidth, image.naturalHeight);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0);
          resolve(canvas.toBuffer('image/png'));
        }
        image.src = req.body.file;
      }
    }
  });
  if (verified === null) return;

  // ファイルをデータベースに保存する
  const save_file = async () => {
    switch (mime_type) {
      case 'image': {
        res.status(201).type('text/plain');
        return await addFile(auth.user_id, 'image/png', verified);
      }
    }
  }
  
  return await save_file();
}
