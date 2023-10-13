import hasMember from 'database/group/has_member';
import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

// サインインしているときで、POSTリクエストのときのみ実行
export default withUserRoute(SendRoute, 'POST');

const redis = new Redis(6379);

async function SendRoute(req: NextApiRequest, res: NextApiResponse) {
  // ユーザー名を入手
  const user_name: string = req.session.user.user_name;
  
  // ユーザーIDを取得
  const user_id = (await prisma.user.findUnique({
    select: { user_id: true },
    where: { user_name: user_name}
  })).user_id;
  if (user_id == null) {
    res.status(500).send('Could not find the user.');
    return;
  }

  // グループIDを取得
  const group_id: string = req.body.group_id;
  if (group_id === null) {
    res.status(400).send('The group_id did not exist in the request.');
    return;
  }

  // グループに所属しているか確認
  const is_belong = await hasMember(user_name, group_id);
  if (!is_belong) {
    res.status(400).send('You do not belong to the group.');
    return;
  }

  // メッセージを取り出す
  const message_text: string = req.body.message;
  if (message_text == null) {
    res.status(400).send('The message did not exist in the request.')
    return;
  }

  // メッセージを追加
  redis.publish(
    "send_message",
    JSON.stringify({
      message_text: message_text,
      author_id: user_id,
      group_id: group_id
    })
  );

  res.status(201).send('Sending message was success.')
}