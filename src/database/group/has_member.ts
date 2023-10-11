import prisma from 'lib/prisma'

// ユーザーがグループに属しているか確認
export default async function hasMember(user_name: string, group_id: string): Promise<boolean> {
  // ユーザーIDを取得
  const user = await prisma.user.findUnique({
    select: {
      user_id: true,
    },
    where: {
      user_name: user_name
    }
  });
  if (!user) return false;
  const user_id = user.user_id;

  return (await prisma.groupsOnUsers.findUnique({
    where: {
      user_id_group_id: {
        user_id: user_id,
        group_id: group_id
      }
    }
  })) != null;
}