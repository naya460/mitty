import prisma from 'lib/prisma'

// ユーザーがグループに属しているか確認
export default async function isBelongGroup(user_name: string, group_id: string): Promise<boolean> {
  // ユーザーIDを取得
  const user_id = (await prisma.user.findUnique({
    where: {
      user_name: user_name
    }
  })).user_id;

  // グループに属しているか確認
  return (await prisma.group.findMany({
    include: {
      members: {
        include: {
          user: true,
        }
      }
    },
    where: {
      group_id: group_id,
      members: {
        every: {
          user: {
            user_name: user_name
          }
        }
      }
    },
  })).length != 0;
}