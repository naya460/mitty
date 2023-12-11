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

import prisma from 'lib/prisma';

// # getUserId
//   ユーザー名からユーザーIDを取得する
//
// ## 引数
//   - user_name : string
//     検索するユーザー名
//
// ## 返り値
//   - Promise<undefined | string>
//     - ユーザーが存在しない場合 : undefine
//     - ユーザーが存在する場合 : string
//       - ユーザーIDをstringで返す
//
// ## 注意
//   - APIから必要なときに呼びだすこと
//   - ユーザーから直接呼び出してはいけない

export default async function getUserId(
  user_name: string,
): Promise<undefined | string> {
  const user = await prisma.user.findUnique({
    select: {
      user_id: true,
    },
    where: {
      user_name: user_name,
    },
  });

  if (!user) {
    return undefined;
  } else {
    return user.user_id;
  }
}
