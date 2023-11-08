import prisma from 'lib/prisma';

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
  requesting_user_name: string,
  additional_user_name: string,
  group_id: string,
): Promise<boolean> {
  // グループが存在するか調べる
  const groupExists = await fetch('http://localhost:9090/database/group/exists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ group_id }),
  });
  if (!(await groupExists.json()).exists) {
    return false;
  }

  // 依頼ユーザーがグループに所属しているか調べる
  const has_requesting_user_res = await fetch('http://localhost:9090/database/group/has_member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({requesting_user_name, group_id}),
  });
  if (!(await has_requesting_user_res.json()).exists) {
    return false;
  }

  // 追加されるユーザーが所属していないことを調べる
  const has_additinal_user_res = await fetch('http://localhost:9090/database/group/has_member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({requesting_user_name, group_id}),
  });
  if ((await has_requesting_user_res.json()).exists) {
    return false;
  }

  // 追加ユーザーのIDを取得
  const additional_user_id_res = await fetch('http://localhost:9090/database/user/get_user_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name: additional_user_name }),
  });
  const additional_user_id = (await additional_user_id_res.json()).user_id;
  if (!additional_user_id) {
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
