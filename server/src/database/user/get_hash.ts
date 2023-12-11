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

// # getUserHash
//   ユーザーのハッシュを取得する
//
// ## 引数
//   - user_name : string
//     対象のユーザー名
//
// ## 返り値
//   - Promise<string | undefined>
//     ユーザーのhash値
//
// ## 注意
//   - APIから必要なときに呼びだすこと
//   - APIから認証を済ませておくこと

export default async function getUserHash(
  user_id: string,
): Promise<string | undefined> {
  const hash = await prisma.user.findUnique({
    select: { hash: true },
    where: { user_id }
  });
  return hash?.hash;
}
