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

// # getGroup
//   ユーザーが参加しているグループを取得する
//
// # 引数
//   - user_name : string
//     グループの一覧を取得するユーザー名
//
// # 返り値
//   - Promise<undefined | string>
//     - 取得に失敗した場合 : undefined
//     - 取得に成功した場合 : string
//       - JSONをstringfyしたstringを返却する
// ### 条件
//   - ユーザーが存在しない場合、失敗する
//
// ## 注意
//   - APIから認証を済ませておくこと

export default async function getGroup(
  user_id: string,
): Promise<undefined | string> {
  // 参加しているグループの一覧を取得
  const groups = await prisma.group.findMany({
    select: {
      group_id: true,
      group_name: true,
    },
    where: {
      members: {
        some: {
          user_id: user_id,
        },
      },
    },
  });

  return JSON.stringify(groups);
}
