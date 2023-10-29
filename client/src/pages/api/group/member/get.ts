import { NextApiRequest, NextApiResponse } from 'next';

import getGroupMember from 'database/group/member/get';
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
  const ret = await getGroupMember(user_name, group_id);
  if (ret == undefined) {
    res.status(400).end();
    return;
  }
  res.status(200).json(ret);
  return;
}
