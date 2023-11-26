import authUser from "common/auth_user";
import { UseRouteHandlerMethod } from "lib/use_route_handler";
import addGroupMember from "database/group/member/add";
import getUserId from "database/user/get_user_id";

export const addGroupMemberBodySchema = {
  type: 'object',
  properties: {
    group_id: { type: 'string' },
    add_user_name: { type: 'string' },
  },
  required: [
    'group_id',
    'add_user_name',
  ],
};

export const addGroupMemberRoute: UseRouteHandlerMethod<{
  Body: {
    group_id: string,
    add_user_name: string,
  }
}> = async (req, res) => {
  // ユーザーを認証
  const auth = await authUser(req, res);
  if (auth === null) return;

  // 追加されるユーザーIDを取得
  const add_user_id = await getUserId(req.body.add_user_name);
  if (add_user_id === undefined) {
    res.status(400);
    return;
  }

  // ユーザーを追加
  const is_success = await addGroupMember(
    auth.user_id,
    add_user_id,
    req.body.group_id
  );
  if (is_success === false) {
    res.status(400);
    return;
  }

  res.status(201);
}
