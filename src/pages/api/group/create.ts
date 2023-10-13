import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

import createGroup from 'database/group/create';

// サインインしているときで、POSTリクエストのときのみ実行
export default withUserRoute(CreateRoute, 'POST');

async function CreateRoute(req: NextApiRequest, res: NextApiResponse) {
  // ユーザー名を入手
  const user_name = req.session.user.user_name;

  // グループ名を取得
  const group_name = req.body.group_name;
  if (group_name == null) {
    res.status(400).end();
  }

  // グループを追加
  if (!(await createGroup(user_name, group_name))) {
    res.status(400).end();
  }
}
