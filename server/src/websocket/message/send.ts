import { WebSocket } from "ws";
import prisma from 'lib/prisma';

import addMessage from "database/message/add";

export default async function wsSendMessageRoute(
  json_message: any,
  user_name: string,
  clients: Map<string, {ws_id: string, ws: WebSocket}[]>,
) {
  // グループIDがあるか確認
  const group_id = json_message.group_id;
  if (group_id === undefined) return;

  // メッセージがあるか確認
  const message_text = json_message.message;
  if (message_text === undefined) return;

  // メッセージを追加
  const success = await addMessage(user_name, group_id, message_text);
  if (success === false) {
    return;
  }

  // グループのメンバーのクッキーを取得
  const member_cookie = await prisma.groupsOnUsers.findMany({
    select: {
      user: {
        select: {
          user_name: true,
        }
      }
    },
    where: {
      group_id: group_id
    }
  });

  // メッセージをメンバーに送信
  member_cookie.forEach((data) => {
    // ユーザーのwsの一覧を取得
    const ws_list = clients.get(data.user.user_name);
    // wsが無いとき次のユーザーへ
    if (ws_list === undefined) return;

    // 全てのwsに配信する
    ws_list.forEach((local_ws) => {
      local_ws.ws.send(JSON.stringify({
        message_text: message_text,
        author: {
          user_name: user_name,
        },
        group_id: group_id,
        time: new Date()
      }));
    });
  });
}
