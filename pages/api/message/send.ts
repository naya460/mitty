import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、POSTリクエストのときのみ実行
export default withUserRoute(SendRoute, 'POST');

async function SendRoute(req: NextApiRequest, res: NextApiResponse) {
  // ユーザー名を入手
  const user_name: string = req.session.user.user_name;
  
  // ユーザーIDを取得
  const user_id = (await prisma.user.findUnique({
    select: { user_id: true },
    where: { user_name: user_name}
  })).user_id;
  if (user_id === null) {
    res.status(500).send('Could not find the user.');
    return;
  }

  // グループIDを取得
  const group_id: string = req.body.group_id;
  if (group_id === null) {
    res.status(400).send('The group_id did not exist in the request.');
  }

  // メッセージを取り出す
  const message_text: string = req.body.message;
  if (message_text === null) {
    res.status(400).send('The message did not exist in the request.')
  }

  // メッセージを追加
  await prisma.message.create({
    data: {
      message_text: message_text,
      author_id: user_id,
      group_id: group_id
    }
  });

  res.status(201).send('Sending message was success.')
}