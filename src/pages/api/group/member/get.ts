import isBelongGroup from 'database/group/is_belong';
import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、GETリクエストのときのみ実行
// group_idを指定して読み込むため、POSTになっている
export default withUserRoute(GetMemberRoute, 'POST');

async function GetMemberRoute(req: NextApiRequest, res: NextApiResponse) {
  // グループを指定しているか確認
  const group_id = req.body.group_id;
  if (group_id == null) {
    res.status(400).send('The group_id did not exist in the request.');
    return;
  }

  // グループに所属しているか確認
  const is_belong = await isBelongGroup(req.session.user.user_name, group_id);
  if (!is_belong) {
    res.status(400).send('You do not belong to the group.');
    return;
  }

  // メンバー取得
  const members = await prisma.groupsOnUsers.findMany({
    select: {
      user: {
        select: {
          user_name: true
        }
      }
    },
    where: {
      group_id: group_id
    }
  });

  res.status(200).json(members);
}