import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// # getUserHash
//   ユーザーのハッシュを取得する
//
// ## 引数
//   - user_name : string
//     対象のユーザー名
//
// ## 返り値
//   - Promise<string | undefined>
//     ユーザーのhash値
//
// ## 注意
//   - APIから必要なときに呼びだすこと
//   - APIから認証を済ませておくこと

export default async function getUserHash(
  user_name: string,
): Promise<string | undefined> {
  const hash = await prisma.user.findUnique({
    select: { hash: true },
    where: { user_name: user_name }
  });
  return hash?.hash;
}
