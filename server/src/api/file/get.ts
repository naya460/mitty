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
import getFile from "database/file/get";
import { UseRouteHandlerMethod } from "lib/use_route_handler";

export const getFileSchema = {
  type: 'object',
  properties: {
    file_id: { type: 'string' },
  },
  required: [
    'file_id',
  ],
};

export const getFileRoute: UseRouteHandlerMethod<{
  Body: {
    file_id: string,
  }
}> = async(req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // ファイルを読み込み
  const file = await getFile(req.body.file_id);
  if (file === null) {
    res.status(400);
    return;
  }
  res.status(200).type(file.file_type);
  return file.file_data;
}
