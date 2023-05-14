import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

import isBelongGroup from 'components/api/is_belong_group';

// サインインしているときで、POSTリクエストのときのみ実行
// group_idを指定して読み込むため、POSTになっている
export default withUserRoute(UserRoute, 'POST');

async function UserRoute(req: NextApiRequest, res: NextApiResponse) {
  // グループを指定しているか確認
  if (req.body.group_id == null) {
    res.status(400).send('The group_id did not exist in the request.');
    return;
  }

  // グループに所属しているか確認
  const is_belong = await isBelongGroup(req.session.user.user_name, req.body.group_id);
  if (!is_belong) {
    res.status(400).send('You do not belong to the group.');
    return;
  }

  // メッセージを取得
  let messages = await prisma.message.findMany({
    select: {
      message_text: true,
      author: {
        select: {
          user_name: true
        }
      },
      time: true
    },
    where: {
      group_id: req.body.group_id
    }
  });
  res.status(200).json(messages);
}