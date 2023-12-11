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
import getUserId from 'database//user/get_user_id';

// # addGroupMember
//   グループにメンバー(ユーザー)を追加する
//
// ## 引数
//   - requesting_user_name : string
//     追加を依頼したユーザー名
//   - additional_user_name : string
//     追加するユーザー名
//   - group_id : string
//     ユーザーを追加するグループ名
//
// ## 返り値
//   - Promise<boolean>
//     - 追加に成功した場合 : true
//     - 追加に失敗した場合 : false
//
// ### 条件
//   - グループが存在しない場合、失敗する
//   - 依頼したユーザーがグループに存在しない場合、失敗する
//   - 追加ユーザーが既に参加している場合、失敗する
//
// ## 注意
//   - 依頼ユーザーは正確である必要がある
//     - APIから認証を済ませておくこと

export default async function addGroupMember(
  requesting_user_id: string,
  additional_user_id: string,
  group_id: string,
): Promise<boolean> {
  if (!(await groupExists(group_id))) {
    return false;
  }

  // 依頼ユーザーがグループに所属しているか調べる
  if (!(await hasMember(requesting_user_id, group_id))) {
    return false;
  }

  // 追加されるユーザーが所属していないことを調べる
  if ((await hasMember(additional_user_id, group_id))) {
    return false;
  }

  // ユーザーを追加
  await prisma.groupsOnUsers.create({
    data: {
      user_id: additional_user_id,
      group_id: group_id,
    }
  });

  return true;
}
