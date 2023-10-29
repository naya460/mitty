import { NextApiRequest, NextApiResponse } from 'next';

import getMessage from 'database/message/get';
import authNewSession from 'lib/withNewSession';

export default async function UserRoute(req: NextApiRequest, res: NextApiResponse) {
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

  // グループを指定しているか確認
  const group_id = req.body.group_id;
  if (group_id == null) {
    res.status(400).end();
    return;
  }

  // 最後に取得したメッセージIDを取得
  const last_message_id = await req.body.last_message_id;

  // メッセージを取得
  const messages = await getMessage(user_name, group_id, last_message_id);
  if (messages == undefined) {
    res.status(400).end();
  }

  res.status(200).json(messages);
}
