import prisma from 'lib/prisma';

import hasMember from 'database/group/has_member';

export default async function getGroupMember(
  user_name: string,
  group_id: string,
): Promise<undefined | string> {
  // グループが存在するか調べる
  if (await prisma.group.findUnique({ where: { group_id } }) == null) {
    return undefined;
  }

  // 依頼ユーザーがグループに所属しているか調べる
  if (!(await hasMember(user_name, group_id))) {
    return undefined;
  }

  // メンバーを取得
  const members = await prisma.groupsOnUsers.findMany({
    select: {
      user: {
        select: {
          user_name: true,
        },
      },
    },
    where: {
      group_id: group_id,
    },
  });

  return JSON.stringify(members);
}
