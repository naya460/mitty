import { NextApiRequest, NextApiResponse } from 'next';

import authNewSession from 'lib/withNewSession';

export default async function UserAddRoute(req: NextApiRequest, res: NextApiResponse) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).end();
    return;
  }

  // 依頼したユーザー名を入手
  const user_name = await authNewSession(req, res);
	if (!user_name) {
		res.status(400).end();
		return;
	}

  // グループIDがリクエストにあるか調べる
  const group_id = req.body.group_id;
  if (group_id == null) {
    res.status(400).end();
    return;
  }

  // 追加されるユーザー名がリクエストにあるか調べる
  const a_user_name = req.body.add_user_name;
  if (a_user_name == null) {
    res.status(400).end();
    return;
  }

  // ユーザーを追加
  const add_res = await fetch('http://localhost:9090/database/group/member/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requesting_user_name: user_name, additional_user_name: a_user_name, group_id }),
  });
  if (!add_res.ok) {
    res.status(400).end();
    return;
  }

  res.status(200).end();
}
