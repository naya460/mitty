import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';

import setUserCookie from 'database/user/set_cookie';
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
	const session_id = getCookie('new-session-cookie', { req, res });
	if (!session_id) {
		res.status(400).end();
	}

	// クッキーを保存
	await setUserCookie(user_name, session_id);

	res.status(200).send(session_id);
	res.end();
}
