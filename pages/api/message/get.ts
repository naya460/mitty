import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(UserRoute, 'GET');

async function UserRoute(req: NextApiRequest, res: NextApiResponse) {
  // メッセージを取得
  let messages = await prisma.message.findMany({
    select: {
      message_text: true,
      author: {
        select: {
          user_name: true
        }
      },
      group: {
        select: {
          group_name: true
        }
      },
      time: true
    }
  });
  res.status(200).json(messages);
}