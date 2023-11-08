import { PrismaClient } from '@prisma/client';
import getUserId from '../user/get_user_id';
import hasMember from '../group/has_member';

const prisma = new PrismaClient();

// # addMessage
//   メッセージを追加する
//
// ## 引数
//   - user_name : string
//     投稿したユーザー名
//   - group_id : string
//     投稿するグループID
//   - message_test : string
//     メッセージの内容
//
// ## 返り値
//   - Promise<boolean>
//     - 取得に失敗した場合 : false
//     - 取得に成功した場合 : true
//
// ## 注意
//   - APIから認証を済ませておくこと

export default async function addMessage(
  user_name: string,
  group_id: string,
  message_text: string,
): Promise<boolean> {
  // ユーザーIDを取得
  const user_id = await getUserId(user_name);
  if (!user_id) {
    return false;
  }

  // 投稿ユーザーがグループに所属しているか調べる
  if (!(await hasMember(user_name, group_id))) {
    return false;
  }

  // メッセージを追加
  await prisma.message.create({
    data: {
      message_text: message_text,
      author_id: user_id,
      group_id: group_id,
    },
  });

  return true;
}
