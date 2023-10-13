import { withUserRoute } from 'lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

import getGroup from 'database/group/get';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(GetRoute, 'GET');

async function GetRoute(req: NextApiRequest, res: NextApiResponse) {
  // ユーザー名を入手
  const user_name = req.session.user.user_name;

  // グループの一覧を取得する
  const groups = await getGroup(user_name);
  if (!groups) {
    res.status(400).end();
    return;
  }
  res.status(200).json(groups);
  return;
}
