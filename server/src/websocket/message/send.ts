// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import prisma from 'lib/prisma';

import addMessage from "database/message/add";
import getUserDisplayName from "database/user/get_display_name";
import { getClient } from 'websocket/subscribe';
import { Redis } from 'ioredis';
const redis_pub = new Redis();
const redis_sub = new Redis();

export default async function wsSendMessageRoute(
  json_message: any,
  user_id: string,
) {
  // グループIDがあるか確認
  const group_id = json_message.group_id;
  if (group_id === undefined) return;

  // メッセージがあるか確認
  const message_text = json_message.message;
  if (message_text === undefined) return;

  // メッセージが空のとき無視
  if (message_text === '') return;

  // 配信
  redis_pub.publish('api/message/send', JSON.stringify({
    user_id, group_id, message_text
  }));
}

redis_sub.subscribe('api/message/send');
redis_sub.on('message', async (channel, message) => {
  const {user_id, group_id, message_text} = JSON.parse(message);

  // メッセージを追加
  const success = await addMessage(user_id, group_id, message_text);
  if (success === false) {
    return;
  }

  // グループのメンバーのクッキーを取得
  const member_cookie = await prisma.groupsOnUsers.findMany({
    select: {
      user: {
        select: {
          user_id: true,
        }
      }
    },
    where: {
      group_id: group_id
    }
  });

  // display_nameを取得
  const display_name = await getUserDisplayName(user_id);

  // メッセージをメンバーに送信
  member_cookie.forEach(async (data) => {
    // ユーザーのwsの一覧を取得
    const ws_list = await getClient(data.user.user_id);
    // wsが無いとき次のユーザーへ
    if (ws_list === undefined) return;

    // 全てのwsに配信する
    ws_list.forEach((local_ws) => {
      local_ws.ws.send(JSON.stringify({
        route: 'message/send',
        message_text: message_text,
        author: {
          user_id: user_id,
          display_name: display_name,
        },
        group_id: group_id,
        time: new Date()
      }));
    });
  });
});
