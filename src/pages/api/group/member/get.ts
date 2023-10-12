import prisma from 'lib/prisma';
import { withUserRoute } from 'lib/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

import getGroupMember from 'database/group/member/get';

// サインインしているときで、GETリクエストのときのみ実行
// group_idを指定して読み込むため、POSTになっている
export default withUserRoute(GetMemberRoute, 'POST');

async function GetMemberRoute(req: NextApiRequest, res: NextApiResponse) {
  // ユーザー名を入手
  const user_name = req.session.user.user_name;

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
  } else {
    res.status(200).json(ret);
    return;
  }
}
