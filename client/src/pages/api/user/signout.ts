import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, deleteCookie } from 'cookies-next';
import authNewSession from 'lib/withNewSession';

export default async function SignOutRoute(req: NextApiRequest, res: NextApiResponse) {
  // GET以外のとき失敗
  if (req.method !== 'GET') {
    res.status(400).end();
    return;
  }

  // 認証する
  const user_name = await authNewSession(req, res);
  if (!user_name) {
    res.status(400).end();
    return;
  }

  // セッションを削除
  await fetch('http://localhost:9090/user/signout', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body: JSON.stringify({ session_id: getCookie('session-id', { req, res }) })
  });
  deleteCookie('session-id', { req, res });
  res.status(200).send('Successful logout');
}