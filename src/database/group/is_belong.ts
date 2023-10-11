import prisma from 'lib/prisma'

// ユーザーがグループに属しているか確認
export default async function isBelongGroup(user_name: string, group_id: string): Promise<boolean> {
  // ユーザーIDを取得
  const user_id = (await prisma.user.findUnique({
    where: {
      user_name: user_name
    }
  })).user_id;

  return (await prisma.groupsOnUsers.findUnique({
    where: {
      user_id_group_id: {
        user_id: user_id,
        group_id: group_id
      }
    }
  })) != null;
}