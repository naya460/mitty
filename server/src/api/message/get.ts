import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import getMessage from "database/message/get";

export const getMessageBodySchema = {
  type: 'object',
  properties: {
    group_id: { type: 'string' },
    last_message_id: { type: 'string' },
  },
  required: [
    'group_id',
  ]
};

export const getMessageRoute: UseRouteHandlerMethod<{
  Body: {
    group_id: string,
    last_message_id: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // メッセージを取得
  const messages = await getMessage(
    auth.user_id,
    req.body.group_id,
    req.body.last_message_id
  );

  console.log(messages);

  if (messages === undefined) {
    res.status(400);
    return;
  }

  res.status(200).type('application/json');
  return await JSON.parse(messages);
}
