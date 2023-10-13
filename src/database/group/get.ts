import prisma from 'lib/prisma';

import getUserId from 'database/user/get_user_id';

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
  user_name: string,
): Promise<undefined | string> {
  // ユーザーIDを取得
  const user_id = await getUserId(user_name);
  if (!user_id) {
    return undefined;
  }

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
