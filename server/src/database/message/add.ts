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
import hasMember from 'database/group/has_member';

// # addMessage
//   メッセージを追加する
//
// ## 引数
//   - user_name : string
//     投稿したユーザー名
//   - group_id : string
//     投稿するグループID
//   - message_test : string
//     メッセージの内容
//
// ## 返り値
//   - Promise<boolean>
//     - 取得に失敗した場合 : false
//     - 取得に成功した場合 : true
//
// ## 注意
//   - APIから認証を済ませておくこと

export default async function addMessage(
  user_id: string,
  group_id: string,
  message_text: string,
): Promise<boolean> {
  // 投稿ユーザーがグループに所属しているか調べる
  if (!(await hasMember(user_id, group_id))) {
    return false;
  }

  // メッセージを追加
  await prisma.message.create({
    data: {
      message_text: message_text,
      author_id: user_id,
      group_id: group_id,
    },
  });

  return true;
}
