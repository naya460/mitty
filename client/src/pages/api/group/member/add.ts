import { NextApiRequest, NextApiResponse } from 'next';

import addGroupMember from 'database/group/member/add';
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
  if (!(await addGroupMember(user_name, a_user_name, group_id))) {
    res.status(400).end();
    return;
  }

  res.status(200).end();
}
