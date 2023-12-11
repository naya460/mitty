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

// # groupExists
//   グループが存在するか調べる
// 
// ## 引数
//   - group_id : string
//     確認するグループID
//
// ## 返り値
//   - Promise<boolean>
//     - 存在する場合 : true
//     - 存在しない場合 : false
//
// ## 注意
//   - APIから確認用として呼びだすこと
//   - ユーザーから直接呼び出してはいけない

export default async function groupExists(
  group_id: string,
): Promise<boolean> {
  const exists = await prisma.group.findUnique({
    where: { group_id }
  });

  return (exists == null)? false : true;
}
