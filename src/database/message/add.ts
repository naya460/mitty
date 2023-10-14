import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import getUserId from "database/user/get_user_id";
import hasMember from "database/group/has_member";

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
}
