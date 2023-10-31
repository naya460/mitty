import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';

import getUserId from 'database/user/get_user_id';
import authNewSession from 'lib/withNewSession';

const redis = new Redis(6379);

export default async function SendRoute(req: NextApiRequest, res: NextApiResponse) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).end();
    return;
  }

  // ユーザー名を入手
  const user_name = await authNewSession(req, res);
	if (!user_name) {
		res.status(400).end();
		return;
	}
  
  // ユーザーIDを取得
  const user_id = await getUserId(user_name);
  if (!user_id) {
    res.status(500).end();
    return;
  }

  // グループIDを取得
  const group_id: string = req.body.group_id;
  if (group_id === null) {
    res.status(400).end();
    return;
  }

  // メッセージを取り出す
  const message_text: string = req.body.message;
  if (message_text == null) {
    res.status(400).end();
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

  res.status(201).end();
}