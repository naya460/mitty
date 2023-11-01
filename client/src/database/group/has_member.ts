import prisma from 'lib/prisma';

// # hasMember
//   ユーザーがグループに属しているか確認する
//
// ## 引数
//   - user_name : string
//     確認するユーザー名
//   - group_id : string
//     確認するグループID
//
// ## 返り値
//   - Promise<boolean>
//     - 存在しない場合 : false
//     - 存在する場合 : true
//
// ## 注意
//   - APIから必要なときに呼び出すこと
//   - ユーザーから直接呼び出してはいけない

export default async function hasMember(
  user_name: string,
  group_id: string
): Promise<boolean> {
  // ユーザーIDを取得
  const user_id_res = await fetch('http://localhost:9090/database/user/get_user_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name }),
  });
  const user_id = (await user_id_res.json()).user_id;
  if (!user_id) {
    return false;
  }

  return (await prisma.groupsOnUsers.findUnique({
    where: {
      user_id_group_id: {
        user_id: user_id,
        group_id: group_id
      }
    }
  })) != null;
}
