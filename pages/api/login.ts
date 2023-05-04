import { withIronSessionApiRoute } from 'iron-session/next'
import prisma, { Prisma } from '../../lib/prisma'

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
        console.log('body: ', req.body);
        await req.session.save();
        const user = await prisma.user.create({
            data: {
                user_name: req.body.user_name,
                password: req.body.password
            }
        });
        const data = await prisma.user.findMany();
        res.status(200).json({data});
    }, {
        cookieName: 'session-id',
        password: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
        cookieOptions: {
            secure: process.env.NODE_ENV === "production"
        }
    }
);