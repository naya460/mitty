import { PrismaClient } from '@prisma/client';
import getUserId from '../user/get_user_id';

const prisma = new PrismaClient();

// # createGroup
//   グループを作成する
//
// ## 引数
//   - user_name : string
//     グループの作成者のユーザー名
//   - group_name : string
//     追加するグループ名
//
// ## 返り値
//   - Promise<boolean>
//     - 作成に成功した場合 : true
//     - 作成に失敗した場合 : false
//
// ### 条件
//   - 作成者のユーザー名が不正なとき、失敗する
//
// ## 注意
//   - APIから認証を済ませておくこと

export default async function createGroup(
  user_name: string,
  group_name: string,
): Promise<boolean> {
  // ユーザーIDを取得
  const user_id = await getUserId(user_name);
  if (!user_id) {
    return false;
  }

  // グループを追加
  await prisma.group.create({
    data: {
      group_name: group_name,
      members: {
        create: [{
          user_id: user_id,
        }],
      },
    },
  });

  return true;
}
