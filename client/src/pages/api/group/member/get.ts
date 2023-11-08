import { NextApiRequest, NextApiResponse } from 'next';

import authNewSession from 'lib/withNewSession';

export default async function GetMemberRoute(req: NextApiRequest, res: NextApiResponse) {
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

  // グループIDがリクエストにあるか調べる
  const group_id = req.body.group_id;
  if (group_id == null) {
    res.status(400).end();
    return;
  }

  // メンバー取得
  const members = await fetch('http://localhost:9090/database/group/member/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name, group_id }),
  });
  const ret = (await members.json()).members;
  if (ret == undefined) {
    res.status(400).end();
    return;
  }
  res.status(200).json(ret);
  return;
}
