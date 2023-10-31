import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// # createUser
//   ユーザーを作成する
//
// ## 引数
//   - user_name : string
//     作成するユーザー名
//   - hash : string
//     サインインに使うハッシュ
//
// ## 返り値
//   なし
//
// ## 注意
//   bcryptのhash作成関数から呼び出す

export default async function createUser(
  user_name: string,
  hash: string
): Promise<void> {
  await prisma.user.create({
    data: {
      user_name: user_name,
      hash: hash,
    }
  });
}
