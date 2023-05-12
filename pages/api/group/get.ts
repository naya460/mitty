import prisma from 'lib/prisma'
import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute(GetRoute);

async function GetRoute(req, res) {
  // グループを取得
  const groups = await prisma.group.findMany({
    select: {
      group_id: true,
      group_name: true,
      members: {
        select: {
          user: {
            select: {
              user_name: true
            }
          }
        }
      }
    }
  });
  res.status(200).json(groups);
}