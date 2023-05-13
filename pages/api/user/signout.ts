import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(SignOutRoute, 'GET');

async function SignOutRoute(req: NextApiRequest, res: NextApiResponse) {
  // セッションを削除
  req.session.destroy();
  res.status(200).send('Successful logout');
}