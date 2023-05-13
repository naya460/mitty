import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(GetRoute, 'GET');

async function GetRoute(req: NextApiRequest, res: NextApiResponse) {
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