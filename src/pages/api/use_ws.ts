import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

import setUserCookie from 'database/user/set_cookie';

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(UseWsRoute, 'GET');

async function UseWsRoute(req: NextApiRequest, res: NextApiResponse) {
    // ユーザー名を取得
    const user_name = req.session.user.user_name;
    if (!user_name) {
        res.status(400).end();
        return;
    }

    // cookieを取得
    const cookie = Object.values(req.cookies)[0];
    if (!cookie) {
        res.status(400).end();
    }

    // クッキーを保存
    await setUserCookie(user_name, cookie);

    res.status(200).send(Object.values(req.cookies)[0]);
    res.end();
}
