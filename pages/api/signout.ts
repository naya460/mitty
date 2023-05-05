import { withSessionRoute } from '../../lib/withSession'

export default withSessionRoute(SignOutRoute);

async function SignOutRoute(req, res) {
  // GET以外のとき失敗
  if (req.method !== 'GET') {
    res.status(400).send('Message is not GET');
    return;
  }

  // セッションを削除
  req.session.destroy();
  res.status(200).send('Successful logout');
}