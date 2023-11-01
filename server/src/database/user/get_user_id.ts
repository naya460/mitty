import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// # getUserId
//   ユーザー名からユーザーIDを取得する
//
// ## 引数
//   - user_name : string
//     検索するユーザー名
//
// ## 返り値
//   - Promise<undefined | number>
//     - ユーザーが存在しない場合 : undefine
//     - ユーザーが存在する場合 : number
//       - ユーザーIDをnumberで返す
//
// ## 注意
//   - APIから必要なときに呼びだすこと
//   - ユーザーから直接呼び出してはいけない

export default async function getUserId(
  user_name: string,
): Promise<undefined | number> {
  const user = await prisma.user.findUnique({
    select: {
      user_id: true,
    },
    where: {
      user_name: user_name,
    },
  });

  if (!user) {
    return undefined;
  } else {
    return user.user_id;
  }
}
