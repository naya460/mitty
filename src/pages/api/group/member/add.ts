import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

import addGroupMember from 'database/member/add';

// サインインしているときで、POSTリクエストのときのみ実行
export default withUserRoute(UserAddRoute, 'POST');

async function UserAddRoute(req: NextApiRequest, res: NextApiResponse) {
  // 依頼したユーザー名を入手
  const user_name: string = req.session.user.user_name;

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
  if (!(await addGroupMember(user_name, a_user_name, group_id))) {
    res.status(400).end();
  }

  res.status(200).end();
}
