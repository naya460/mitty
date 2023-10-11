import hasMember from 'database/group/has_member';
import prisma from 'lib/prisma'

export default async function addGroupMember(
  requesting_user_name: string,
  additional_user_name: string,
  group_id: string,
): Promise<boolean> {
  // グループが存在するか調べる
  if (await prisma.group.findUnique({ where: { group_id } }) == null) {
    return false;
  }

  // 依頼ユーザーがグループに所属しているか調べる
  if (!(await hasMember(requesting_user_name, group_id))) {
    return false;
  }

  // 追加されるユーザーが所属していないことを調べる
  if (await hasMember(additional_user_name, group_id)) {
    return false;
  }

  // 追加ユーザーのIDを取得
  const additional_user = await prisma.user.findUnique({
    select: {
      user_id: true,
    },
    where: {
      user_name: additional_user_name,
    },
  });
  if (!additional_user) return false;
  const additional_user_id = additional_user.user_id;

  // ユーザーを追加
  await prisma.groupsOnUsers.create({
    data: {
      user_id: additional_user_id,
      group_id: group_id,
    }
  });

  return true;
}
