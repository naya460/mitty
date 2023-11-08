import { NextApiRequest, NextApiResponse } from 'next';

import authNewSession from 'lib/withNewSession';

export default async function GetRoute(req: NextApiRequest, res: NextApiResponse) {
  // GET以外のとき失敗
  if (req.method !== 'GET') {
    res.status(400).end();
    return;
  }
  
  // ユーザー名を入手
  const user_name = await authNewSession(req, res);
  if (!user_name) {
    res.status(400).json(JSON.stringify({}));
    return;
  }

  // グループの一覧を取得する
  const groups_res = await fetch('http://localhost:9090/database/group/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name }),
  });
  const groups = (await groups_res.json()).groups;
  if (!groups) {
    res.status(400).end();
    return;
  }
  res.status(200).json(groups);
  return;
}
