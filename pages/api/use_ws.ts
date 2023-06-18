import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma'

// サインインしているときで、GETリクエストのときのみ実行
export default withUserRoute(UseWsRoute, 'GET');

async function UseWsRoute(req: NextApiRequest, res: NextApiResponse) {
    await prisma.user.update({
        data: {
            cookie: Object.values(req.cookies)[0]
        },
        where: {
            user_name: req.session.user.user_name
        }
    })
    res.status(200).send(Object.values(req.cookies)[0]);
    res.end();
}