import prisma from 'lib/prisma'
import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute(CreateRoute);

async function CreateRoute(req, res) {
  // POST以外のとき失敗
  if (req.method !== 'POST') {
    res.status(400).send('Message is not POST');
    return;
  }
  
  // ユーザー名を入手
  const user_name: string = req.session.user.user_name;
  if (user_name === null) {
    res.status(400).send('The user_name did not exist in the request.')
  }
  
  // ユーザーIDを取得
  const user_id = (await prisma.user.findUnique({
    select: { user_id: true },
    where: { user_name: user_name}
  })).user_id;
  if (user_id === null) {
    res.status(500).send('Could not find the user.');
    return;
  }

  // グループ名を取得
  const group_name: string = req.body.group_name;
  if (group_name === null) {
    res.status(400).send('The group_name did not exist in the request.');
  }

  // グループを追加
  await prisma.group.create({
    data: {
      group_name: group_name,
      members: {
        create: [{
          user_id: user_id
        }]
      }
    }
  })


}