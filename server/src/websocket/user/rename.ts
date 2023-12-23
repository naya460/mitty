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

import prisma from "lib/prisma";
import { getClient } from "websocket/subscribe";

import { Redis } from "ioredis";
const redis = new Redis({
  host: "redis",
  port: 6379,
});

export default function subscribeUserRename() {
  redis.subscribe('api/user/rename');
}

redis.on('message', async (channel, message) => {
  const {user_id, display_name} = JSON.parse(message);

  // 参加しているグループのメンバーを取得
  const members = await prisma.groupsOnUsers.findMany({
    select: {
      group: {
        select: {
          members: true,
        }
      }
    },
    where: {
      user_id: user_id,
    },
  });

  // ユーザーの一覧を作成
  const user_list = new Set<string>();
  members.forEach(value => {
    value.group.members.forEach(value => {
      user_list.add(value.user_id);
    });
  });
  
  // 対象ユーザーに配信する
  user_list.forEach(async (value) => {
    const ws_list = await getClient(value);
    if (ws_list === undefined) return;

    ws_list.forEach((ws) => {
      ws.ws.send(JSON.stringify({
        route: 'user/rename',
        user_id: user_id,
        display_name: display_name,
      }));
    });
  });
});
