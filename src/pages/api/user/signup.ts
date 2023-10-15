import { withSessionRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

import createUser from 'database/user/create';
import getUserId from 'database/user/get_user_id';

export default withSessionRoute(SignUpRoute);

async function SignUpRoute(req: NextApiRequest, res: NextApiResponse) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).send('Message is not POST');
    return;
  }

  // 作成するユーザー名を取得
  const user_name: string = req.body.user_name;
  if (user_name) {
    res.status(400).end();
    return;
  }

  // ユーザーが無いことを確認
  const user_id = await getUserId(user_name);
  if (user_id) {
    res.status(400).end();
    return;
  }

  // パスワードを取得
  const password = req.body.password;
  if (!password) {
    res.status(400).end();
    return;
  }

  // 確認パスワードを取得
  const confirm_password = req.body.confirm_password;

  // パスワードが一致しているか確認
  if (password !== confirm_password) {
    // パスワードが一致していないことを返却
    res.status(500).end();
    return;
  }
  
  // ユーザーを作成
  const bcrypt = require('bcrypt');
  bcrypt.hash(req.body.password, 10, async function(err, hash) {
    await createUser(req.body.user_name, hash);
  });
  
  // セッションを保存
  req.session.user = {
    user_name: req.body.user_name
  }
  await req.session.save();
  
  res.status(201).end();
}
