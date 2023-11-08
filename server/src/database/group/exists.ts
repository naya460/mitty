import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
