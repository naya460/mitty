import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import getGroupMember from "database/group/member/get";

export const getGroupMemberBodySchema = {
  type: 'object',
  properties: {
    group_id: { type: 'string' },
  },
  required: [
    'group_id',
  ],
};

export const getGroupMemberRoute: UseRouteHandlerMethod<{
  Body: {
    group_id: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // メンバーを取得
  const members = await getGroupMember(auth.user_name, req.body.group_id);
  if (members === undefined) {
    res.status(400);
    return;
  }

  return await JSON.parse(members);
}
