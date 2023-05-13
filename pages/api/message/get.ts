import prisma from 'lib/prisma'
import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute(UserRoute);

async function UserRoute(req, res) {
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
  console.log()
  res.status(200).json(messages);
}