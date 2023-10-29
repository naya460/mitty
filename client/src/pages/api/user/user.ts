import { NextApiRequest, NextApiResponse } from 'next';
import authNewSession from 'lib/withNewSession';

export default async function UserRoute(req: NextApiRequest, res: NextApiResponse) {
  // GET以外のとき失敗
  if (req.method !== 'GET') {
    res.status(400).send('Message is not GET');
    return;
  }

  // ログイン中のユーザデータを返す
  const user_name = await authNewSession(req, res);
  if (user_name) {
    res.status(200).json(JSON.stringify({user_name}));
  } else {
    res.status(200).json(null);
  }
}
