import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "common/use_route_handler";
import getUserId from "database/user/get_user_id";
import addMessage from "database/message/add";

export const sendMessageBodySchema = {
  type: 'object',
  properties: {
    message_text: { type: 'string' },
    group_id: { type: 'string' },
  },
  required: [
    'message_text',
    'group_id',
  ],
};

export const sendMessageRoute: UseRouteHandlerMethod<{
  Body: {
    message_text: string,
    group_id: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // ユーザーIDを取得
  const user_id = await getUserId(auth.user_name);
  if (user_id === undefined) {
    res.status(500);
    return;
  }

  // メッセージを追加
  await addMessage(
    auth.user_name,
    req.body.group_id,
    req.body.message_text
  );

  res.status(201);
}
