import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(SignOutRoute, 'GET');

async function SignOutRoute(req: NextApiRequest, res: NextApiResponse) {
  // セッションを削除
  await fetch('http://localhost:9090/user/signout', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body: JSON.stringify({ session_id: req.session.user.session_id })
  });
  req.session.destroy();
  deleteCookie('new-session-cookie', { req, res });
  res.status(200).send('Successful logout');
}