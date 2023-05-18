import prisma from 'lib/prisma'
import { withUserRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next';

// サインインしているときで、POSTリクエストのときのみ実行
export default withUserRoute(UserAddRoute, 'POST');

async function UserAddRoute(req: NextApiRequest, res: NextApiResponse) {
  // 依頼したユーザー名を入手
  const user_name: string = req.session.user.user_name;

  // グループIDがリクエストにあるか調べる
  const group_id = req.body.group_id;
  if (group_id == null) {
    res.status(400).send('The group_id did not exist in the request.');
    return;
  }

  // 依頼したユーザーがグループに参加しているか検索
  const r_joined = await prisma.groupsOnUsers.findMany({
    where: {
      user: {
        user_name: user_name
      },
      group_id: group_id
    }
  });
  if (r_joined.length == 0) {
    res.status(400).send('You have not joined the group.')
    return;
  }

  // 追加されるユーザー名がリクエストにあるか調べる
  const a_user_name = req.body.add_user_name;
  if (a_user_name == null) {
    res.status(400).send('The add_user_name did not exist in the request.');
    return;
  }

  // 追加されるユーザーが存在するか調べる
  const a_user_exist = await prisma.user.findUnique({
    where: {
        user_name: a_user_name
    }
  });
  if (a_user_exist == null) {
    res.status(400).send('The add_user did not exist in the database.');
    return;
  }
  
  // 追加されるユーザーがグループに参加していないか確認
  const a_joined = await prisma.groupsOnUsers.findMany({
    where: {
      user: {
        user_name: a_user_name
      },
      group_id: group_id
    }
  });
  if (a_joined.length != 0) {
    res.status(400).send('The add_user has already joined the group.');
    return;
  }

  // ユーザーを追加
  await prisma.group.update({
    data: {
      members: {
        create: {
          user_id: a_user_exist.user_id
        }
      }
    },
    where: {
      group_id: group_id
    }
  });

  res.send('The user was added successfully.');
  res.status(200).end()
}