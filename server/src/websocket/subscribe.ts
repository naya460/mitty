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

import { WebSocket } from "ws";

const clients = new Map<string, {ws_id: string, ws: WebSocket}[]>();

export async function wsSubscribeRoute(
  user_id: string,
  ws_id: string,
  ws: WebSocket,
) {
  // 配信先として登録
  if (clients.get(user_id)?.find((data) => {data.ws_id === ws_id}) === undefined) {
    const tmp = clients.get(user_id);
    if (tmp === undefined) {
      clients.set(user_id, [ { ws_id, ws } ]);
    } else {
      tmp.push({ ws_id, ws });
      clients.set(user_id, tmp);
    }
  }
}

export async function getClient(user_id: string) {
  return clients.get(user_id);
}
