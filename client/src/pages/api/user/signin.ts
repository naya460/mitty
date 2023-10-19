import { withSessionRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

import getUserId from 'database/user/get_user_id';
import getUserHash from 'database/user/get_hash';

export default withSessionRoute(SignInRoute);

async function SignInRoute(req: NextApiRequest, res: NextApiResponse) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).end();
    return;
  }

  // ユーザー名を入手
  const user_name: string = req.body.user_name;
  if (!user_name) {
    res.status(400).end();
    return;
  }

  // ユーザーが存在することを確認
  const user_id = await getUserId(user_name);
  if (!user_id) {
    res.status(400).end();
    return;
  }

  // パスワードを取得
  const password = req.body.password;
  if (!password) {
    res.status(400).end();
  }

  // ユーザーを認証する
  const hash = await getUserHash(user_name);
  const bcrypt = require('bcrypt');
  fetch('http://localhost:9090/user/signin', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body: JSON.stringify({ user_name: req.body.user_name })
  });
  bcrypt.compare(password, hash, async function(err, result) {
    if (result) {
      // セッションを保存
      req.session.user = {
        user_name: req.body.user_name
      }
      await req.session.save();
      // 成功したことを返却
      res.status(200).json({ success: true });
    } else {
      // 失敗したことを返却
      res.status(400).send({ success: false });
    }
  });
}
