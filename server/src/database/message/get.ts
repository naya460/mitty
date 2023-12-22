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

import hasMember from 'database/group/has_member';

// # getMessage
//   指定したグループのメッセージを取得する。
//   指定したメッセージより前の50件を読み込む。
//
// ## 引数
//   - user_name : string
//     メッセージを取得するユーザー
//   - group_id : string
//     取得対象のグループ
//   - last_message_id ? : string
//     最後に読み込んだメッセージを指定
// ## 返り値
//   - Promise<undefined | string>
//     - 取得に失敗した場合 : undefined
//     - 取得に成功した場合 : string
//       - JSONをstringfyしたstringを返却する
//
// ### 条件
//   - ユーザーがグループに所属している必要がある
//   - APIから認証を済ませておくこと

export default async function getMessage(
  user_id: string,
  group_id: string,
  last_message_id?: string,
): Promise<undefined | string> {
  // 依頼ユーザーがグループに所属しているか調べる
  if (!(await hasMember(user_id, group_id))) {
    return undefined;
  }

  // データベースから取得する
  const messages = await prisma.message.findMany({
    select: {
      message_id: true,
      message_text: true,
      author: {
        select: {
          user_id: true,
          display_name: true,
        },
      },
      time: true,
    },
    where: {
      group_id: group_id,
      message_id: {
        lt: last_message_id,
      },
    },
    orderBy: {
      message_id: "desc",
    },
    take: 50,
  });

  return JSON.stringify(messages);
}
