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
    // 失敗したことを返却
    res.status(500).json({ success: false });
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
      // 成功したことを返却
      res.status(200).json({ success: true });
    } else {
      // 失敗したことを返却
      res.status(400).send({ success: false });
    }
  });
}