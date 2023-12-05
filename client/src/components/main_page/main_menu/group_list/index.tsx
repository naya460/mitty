import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './index.css'

import Group from './group'
import useWebSocket from 'components/common/useWebSocket';

interface Props {
  setSelectedGroupData: (id: string, name: string) => void;
  selected_group_id: string;
}

export default function GroupList(props: Props) {
  const router = useRouter();
  const [groupList, setGroupList] = useState<{ id: string, name: string}[]>(null);
  const [displayGroups, setDisplayGroups] = useState(null);

  const [socketSend] = useWebSocket(
    (message) => {
      console.log(message);
    }
  );

  // グループの作成関数
  const handleCreateGroup = async (event) => {
    event.preventDefault();

    // 送信するリクエストを作成
    const message = {
      route: 'group/create',
      group_name: event.target.group_name.value
    }
    
    // メッセージを送信
    socketSend(message);
  }

  // 最初に読み込まれたとき、クエリを削除
  useEffect(() => {
    router.replace({
      pathname: '/',
      query: {}
    });
  }, []);

  // クエリが更新されたとき表示を変更
  useEffect(() => {
    // グループが存在しないとき、何もしない
    if (groupList == null) return;

    // クエリが指定されていないとき、選択を解除
    if (router.query.group_id as string == null) {
      props.setSelectedGroupData(null, null);
      return;
    }
    // 表示を更新
    const id = router.query.group_id as string;
    props.setSelectedGroupData(
      id,
      groupList.find(list => list.id === id).name
    );
  }, [router.query])

  // 選択されたグループが変更されたら、表示を変更
  useEffect(() => {
    (async () => {
      // グループを取得
      const res = await fetch(
        `http://${location.hostname}:9090/group/get`,
        { mode: 'cors', credentials: 'include' }
      );
      const groups = await res.json();
      // グループの表示を作成
      let group_list = [];
      let display_groups = [];
      for (let i in groups) {
        // グループの一覧に追加
        group_list.push({
          id: groups[i].group_id,
          name: groups[i].group_name,
          members: function(){
            let list = [];
            for (let j in groups[i].members) {
              list.push(groups[i].members[j].user.user_name);
            }
            return list;
          }()
        });
        // グループの表示を追加
        display_groups.push(
          <Group
            group_name={groups[i].group_name}
            group_id={groups[i].group_id}
            selected_group_id={props.selected_group_id}
            key={i}
          />
        )
      }
      setGroupList(group_list);
      setDisplayGroups(display_groups);
    })()
  }, [props.selected_group_id])

  return (
    <div className={styles.top}>
      <form onSubmit={handleCreateGroup}>
        <input name='group_name' type='text'/>
        <button type='submit'>Create Group</button>
      </form>
      {displayGroups}
    </div>
  )
}
