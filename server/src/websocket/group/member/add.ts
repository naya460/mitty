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

import { Redis } from "ioredis";

import { getClient } from "websocket/subscribe";
const redis = new Redis({
  host: "redis",
  port: 6379,
});
const redis_pub = new Redis({
  host: "redis",
  port: 6379,
});

export default function subscribeGroupMemberAdd() {
  redis.subscribe('api/group/member/add');
}

redis.on('message', async (channel, message) => {
  const {
    user_id,
    add_user_id,
    add_user_name,
    add_user_icon,
    group_id,
    group_name
  } = JSON.parse(message);

  // 作成したユーザーに送信
  const ws1 = await getClient(user_id);
  if (ws1 === undefined) return;
  ws1.forEach((local_ws) => {
    local_ws.ws.send(JSON.stringify({
      route: 'group/member/add',
      group_id: group_id,
      add_user_id: add_user_id,
      add_user_name: add_user_name,
      add_user_icon: add_user_icon,
    }))
  });

  // 追加されたユーザーに送信
  redis_pub.publish('api/group/create', JSON.stringify({
    user_id: add_user_id, group_id, group_name
  }));
});
