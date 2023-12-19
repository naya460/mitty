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

import groupExists from 'database/group/exists';
import hasMember from 'database/group/has_member';

// # getGroupMember
//   グループに参加しているメンバー全員を取得する
//
// ## 引数
//   - user_name : string
//     メンバーを検索するユーザー
//
// ## 返り値
//   - Promise<undefined | string>
//     - 取得に失敗した場合 : undefined
//     - 取得に成功した場合 : string
//       - JSONをstringfyしたstringを返却する
//
// ### 条件
//   - グループが存在しない場合、失敗する
//   - 依頼したユーザーが存在しない場合、失敗する
//
// ## 注意
//   - 依頼ユーザーは正確である必要がある
//     - APIから認証を済ませておくこと

export default async function getGroupMember(
  user_id: string,
  group_id: string,
): Promise<undefined | string> {
  // グループが存在するか調べる
  if (!(await groupExists(group_id))) {
    return undefined;
  }

  // 依頼ユーザーがグループに所属しているか調べる
  if (!(await hasMember(user_id, group_id))) {
    return undefined;
  }

  // メンバーを取得
  const members = await prisma.groupsOnUsers.findMany({
    select: {
      user: {
        select: {
          user_id: true,
          display_name: true,
          icon: true,
        },
      },
    },
    where: {
      group_id: group_id,
    },
  });

  return JSON.stringify(members);
}
