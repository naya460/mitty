import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next'

import getUserId from 'database/user/get_user_id';

export default async function SignInRoute(req: NextApiRequest, res: NextApiResponse) {
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
  const get_hash_res = await fetch('http://localhost:9090/database/user/get_hash', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name: req.body.user_name }),
  });
  const hash = (await get_hash_res.json()).hash;
  const bcrypt = require('bcrypt');
  const session_id_res = await fetch('http://localhost:9090/user/signin', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body: JSON.stringify({ user_name: req.body.user_name })
  });
  const session_id = JSON.stringify(await session_id_res.json());
  bcrypt.compare(password, hash, async function(err, result) {
    if (result) {
      // セッションを保存
      setCookie('session-id', Object.values(await JSON.parse(session_id))[0], { req, res });
      // 成功したことを返却
      res.status(200).json({ success: true });
    } else {
      // 失敗したことを返却
      res.status(400).send({ success: false });
    }
  });
}
