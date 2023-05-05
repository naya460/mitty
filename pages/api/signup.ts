import { withIronSessionApiRoute } from 'iron-session/next'
import prisma, { Prisma } from '../../lib/prisma'

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
        // セッションを保存
        await req.session.save();
        // ユーザーが無いことを確認
        const check_user = await prisma.user.findUnique({
            where: { user_name: req.body.user_name }
        })
        if (check_user) {
            res.status(500).send('The user already exists.');
            return;
        }
        // パスワードが一致しているか確認
        if (req.body.password !== req.body.confirm_password) {
            console.log(req.body)
            return;
        }
        // ユーザーを作成
        const user = await prisma.user.create({
            data: {
                user_name: req.body.user_name,
                password: req.body.password
            }
        });
        res.status(201).send('The user was successfully created.');
    }, {
        cookieName: 'session-id',
        password: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
        cookieOptions: {
            secure: process.env.NODE_ENV === "production"
        }
    }
);