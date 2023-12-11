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

// # createUser
//   ユーザーを作成する
//
// ## 引数
//   - user_name : string
//     作成するユーザー名
//   - hash : string
//     サインインに使うハッシュ
//
// ## 返り値
//   なし
//
// ## 注意
//   bcryptのhash作成関数から呼び出す

export default async function createUser(
  user_name: string,
  hash: string
): Promise<void> {
  await prisma.user.create({
    data: {
      user_name: user_name,
      display_name: user_name,
      hash: hash,
    }
  });
}
