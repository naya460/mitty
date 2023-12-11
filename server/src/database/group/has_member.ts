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

import getUserId from 'database/user/get_user_id';

// # hasMember
//   ユーザーがグループに属しているか確認する
//
// ## 引数
//   - user_name : string
//     確認するユーザー名
//   - group_id : string
//     確認するグループID
//
// ## 返り値
//   - Promise<boolean>
//     - 存在しない場合 : false
//     - 存在する場合 : true
//
// ## 注意
//   - APIから必要なときに呼び出すこと
//   - ユーザーから直接呼び出してはいけない

export default async function hasMember(
  user_id: string,
  group_id: string
): Promise<boolean> {
  return (await prisma.groupsOnUsers.findUnique({
    where: {
      user_id_group_id: {
        user_id: user_id,
        group_id: group_id
      }
    }
  })) != null;
}
