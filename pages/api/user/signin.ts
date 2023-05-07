import prisma from 'lib/prisma'
import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute(SignInRoute);

async function SignInRoute(req, res) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).send('Message is not POST');
    return;
  }

  // ユーザーが存在することを確認
  const check_user = await prisma.user.findUnique({
    where: { user_name: req.body.user_name }
  });
  if (!check_user) {
    res.status(500).send('The user was not found.');
    return;
  }

  // ユーザーを認証する
  const hash = await prisma.user.findUnique({
    select: { hash: true },
    where: { user_name: req.body.user_name }
  });
  const bcrypt = require('bcrypt');
  bcrypt.compare(req.body.password, hash.hash, async function(err, result) {
    if (result) {
      // セッションを保存
      req.session.user = {
        user_name: req.body.user_name
      }
      await req.session.save();
      res.status(200).send('Successful login.');
    } else {
      // パスワードが間違っていることを返却
      res.status(400).send('Innocent password.');
    }
  });
}