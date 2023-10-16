import { withSessionRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(UserRoute);

async function UserRoute(req: NextApiRequest, res: NextApiResponse) {
  // GET以外のとき失敗
  if (req.method !== 'GET') {
    res.status(400).send('Message is not GET');
    return;
  }

  // ログイン中のユーザデータを返す
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(200).json(null);
  }
}