import { NextApiRequest, NextApiResponse } from 'next';

import authNewSession from 'lib/withNewSession';

export default async function CreateRoute(req: NextApiRequest, res: NextApiResponse) {
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

  // グループ名を取得
  const group_name = req.body.group_name;
  if (group_name == null) {
    res.status(400).end();
  }

  // グループを追加
  const createRes = await fetch('http://localhost:9090/database/group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name, group_name }),
  });
  if (!createRes.ok) {
    res.status(400).end();
  }
}
