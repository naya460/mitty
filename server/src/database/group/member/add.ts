import { PrismaClient } from '@prisma/client';
import groupExists from '../exists';
import hasMember from '../has_member';
import getUserId from '../../user/get_user_id';

const prisma = new PrismaClient();

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
  if (!(await groupExists(group_id))) {
    return false;
  }

  // 依頼ユーザーがグループに所属しているか調べる
  if (!(await hasMember(requesting_user_name, group_id))) {
    return false;
  }

  // 追加されるユーザーが所属していないことを調べる
  if ((await hasMember(additional_user_name, group_id))) {
    return false;
  }

  // 追加ユーザーのIDを取得
  const additional_user_id = (await getUserId(additional_user_name));
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
