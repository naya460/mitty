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

// # createGroup
//   グループを作成する
//
// ## 引数
//   - user_name : string
//     グループの作成者のユーザー名
//   - group_name : string
//     追加するグループ名
//
// ## 返り値
//   - Promise<boolean>
//     - 作成に成功した場合 : true
//     - 作成に失敗した場合 : false
//
// ### 条件
//   - 作成者のユーザー名が不正なとき、失敗する
//
// ## 注意
//   - APIから認証を済ませておくこと

export default async function createGroup(
  user_id: string,
  group_name: string,
): Promise<null | string> {
  // グループを追加
  const created_data = await prisma.group.create({
    data: {
      group_name: group_name,
      members: {
        create: [{
          user_id: user_id,
        }],
      },
    },
  });

  return created_data.group_id;
}
