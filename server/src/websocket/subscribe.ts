import { WebSocket } from "ws";

export default async function wsSubscribeRoute(
  user_name: string,
  ws_id: string,
  ws: WebSocket,
  clients: Map<string, {ws_id: string, ws: WebSocket}[]>
) {
  // 配信先として登録
  if (clients.get(user_name)?.find((data) => {data.ws_id === ws_id}) === undefined) {
    const tmp = clients.get(user_name);
    if (tmp === undefined) {
      clients.set(user_name, [ { ws_id, ws } ]);
    } else {
      tmp.push({ ws_id, ws });
      clients.set(user_name, tmp);
    }
  }
}
