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
