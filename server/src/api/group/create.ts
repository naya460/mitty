import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import createGroup from "database/group/create";

export const createGroupBodySchema = {
  type: 'object',
  properties: {
    group_name: { type: 'string' },
  },
  required: [
    'group_name',
  ],
};

export const createGroupRoute: UseRouteHandlerMethod<{
  Body: {
    group_name: string
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // グループを追加
  const success = await createGroup(auth.user_id, req.body.group_name);
  if (success === null) {
    res.status(400);
    return;
  }
}
