import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {
        console.log('body: ', req.body);
        await req.session.save();
        res.status(200).send('ok');
    }, {
        cookieName: 'session-id',
        password: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
        cookieOptions: {
            secure: process.env.NODE_ENV === "production"
        }
    }
);