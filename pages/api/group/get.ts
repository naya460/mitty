import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(GetRoute, 'GET');

async function GetRoute(req: NextApiRequest, res: NextApiResponse) {
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
    },
    where: {
      members: {
        every: {
          user: {
            user_name: req.session.user.user_name
          }
        }
      }
    }
  });
  res.status(200).json(groups);
}