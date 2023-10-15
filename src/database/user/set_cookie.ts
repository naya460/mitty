import prisma from "lib/prisma";

// # setCookie
//   ユーザーのCookieを設定する
//
// ## 引数
//   - user_name : string
//     保存するユーザー名
//   - cookie : string
//     保存するCookie
//
// ## 返り値
//   なし
//
// ## 注意点
//   - APIから認証を済ませておくこと

export default async function setUserCookie(
  user_name: string,
  cookie: string,
): Promise<void> {
  await prisma.user.update({
    data: {
        cookie: cookie
    },
    where: {
        user_name: user_name
    }
  });
}
