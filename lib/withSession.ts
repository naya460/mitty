import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'

const sessionOptions = {
  cookieName: 'session-id',
  password: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
  cookieOptions: {
      secure: process.env.NODE_ENV === "production"
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      user_name: string;
    }
  }
}