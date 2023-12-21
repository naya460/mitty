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

import { getClient } from "websocket/subscribe";

import { Redis } from 'ioredis';
const redis = new Redis();

export default function subscribeGroupCreate() {
  redis.subscribe('api/group/create');
}

redis.on('message', async (channel, message) => {
  const {user_id, group_id, group_name} = JSON.parse(message);

  // ユーザーに作成したグループを返答
  const ws = await getClient(user_id);
  if (ws === undefined) return;
  ws.forEach((local_ws) => {
    local_ws.ws.send(JSON.stringify({
      route: 'group/create',
      group_id: group_id,
      group_name: group_name,
    }));
  });
});
