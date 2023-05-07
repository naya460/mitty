import prisma from '../../../lib/prisma'
import { withSessionRoute } from '../../../lib/withSession'

export default withSessionRoute(SignUpRoute);

async function SignUpRoute(req, res) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).send('Message is not POST');
    return;
  }

  // ユーザーが無いことを確認
  const check_user = await prisma.user.findUnique({
    where: { user_name: req.body.user_name }
  })
  if (check_user) {
    res.status(500).send('The user already exists.');
    return;
  }

  // パスワードが一致しているか確認
  if (req.body.password !== req.body.confirm_password) {
    return;
  }
  
  // ユーザーを作成
  const bcrypt = require('bcrypt');
  bcrypt.hash(req.body.password, 10, async function(err, hash) {
    await prisma.user.create({
      data: {
        user_name: req.body.user_name,
        hash: hash,
      }
    });
  })
  
  // セッションを保存
  req.session.user = {
    user_name: req.body.user_name
  }
  await req.session.save();
  
  res.status(201).send('The message was successfully sent.');
}