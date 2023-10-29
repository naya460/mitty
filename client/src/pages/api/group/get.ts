import { NextApiRequest, NextApiResponse } from 'next';

import getGroup from 'database/group/get';
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
  const groups = await getGroup(user_name);
  if (!groups) {
    res.status(400).end();
    return;
  }
  res.status(200).json(groups);
  return;
}
