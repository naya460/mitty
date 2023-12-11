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

import createGroup from "database/group/create";
import { WebSocket } from "ws";

export default async function wsCreateGroupRoute(
  json_message: any,
  user_id: string,
  clients: Map<string, {ws_id: string, ws: WebSocket}[]>
) {
  // グループ名があるか確認
  const group_name = json_message.group_name;
  if (group_name === undefined) return;

  // グループを作成
  const group_id = await createGroup(user_id, group_name);

  // ユーザーに作成したグループを返答
  const ws = clients.get(user_id);
  if (ws === undefined) return;
  ws.forEach((local_ws) => {
    local_ws.ws.send(JSON.stringify({
      route: 'group/create',
      group_id: group_id,
      group_name: group_name,
    }));
  });
}
