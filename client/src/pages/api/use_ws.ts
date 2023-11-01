import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';

import authNewSession from 'lib/withNewSession';

export default async function UseWsRoute(req: NextApiRequest, res: NextApiResponse) {
	// GET以外のとき失敗
	if (req.method !== 'GET') {
	  res.status(400).send('Message is not GET');
	  return;
	}

	// ユーザー名を取得
  const user_name = await authNewSession(req, res);
	if (!user_name) {
		res.status(400).end();
		return;
	}

	// cookieを取得
	const session_id = getCookie('session-id', { req, res });
	if (!session_id) {
		res.status(400).end();
	}

	// クッキーを保存
	await fetch('http://localhost:9090/database/user/set_cookie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_name, cookie: session_id }),
  });

	res.status(200).send(session_id);
	res.end();
}
