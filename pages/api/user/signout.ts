import { withUserRoute } from 'lib/withSession'

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(SignOutRoute, 'GET');

async function SignOutRoute(req, res) {
  // セッションを削除
  req.session.destroy();
  res.status(200).send('Successful logout');
}