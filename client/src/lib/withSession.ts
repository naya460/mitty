import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const sessionOptions = {
  cookieName: 'session-id',
  password: 'z8Cpj2nNv9VPdsxZxostDu5ufXxme2V0',
  cookieOptions: {
      secure: process.env.NODE_ENV === "production"
  }
}

// iron-sessionをオプション付きで呼び出す
export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// iron-sessionでユーザーが確認できたとき呼び出す
// メソッドの指定がある場合、それも確認
export function withUserRoute(handler: NextApiHandler, method?: string) {
  // 実際に処理する関数
  const handler_wrapper = async (req: NextApiRequest, res: NextApiResponse) => {
    // サインインしていないとき、400番のステータスコードを返す
    if (req.session.user == null) {
      res.status(401).send('You are does not signed in.');
    }
    // メソッドの指定が無い → handlerを実行
    // メソッドの指定が有る → メソッドが一致するとき、handlerを実行
    else if (!method || req.method === method){
      await handler(req, res);
    }
    // メソッドが一致しないとき、400番のステータスコードを返す
    else {
      res.status(400).send(`Message is not ${method}.`);
    }
  }
  // 実行
  return withSessionRoute(handler_wrapper);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      user_name: string;
    }
  }
}