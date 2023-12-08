import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import styles from './index.css'

import Group from './group'
import useWebSocket from 'components/common/useWebSocket';
import { MainContext } from 'components/main_page/contexts';

export default function GroupList() {
  const router = useRouter();
  const [groupList, setGroupList] = useState<{ id: string, name: string}[]>(null);
  const { group_id, set_group } = useContext(MainContext);

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
      set_group(null, null);
      return;
    }
    // 表示を更新
    const id = router.query.group_id as string;
    set_group(
      id,
      groupList.find(list => list.id === id).name
    );
  }, [router.query])

  // 最初にグループの一覧を読み込む
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
      }
      setGroupList(group_list);
    })()
  }, []);

  return (
    <div className={styles.top}>
      <form onSubmit={handleCreateGroup}>
        <input name='group_name' type='text'/>
        <button type='submit'>Create Group</button>
      </form>
      {groupList?.map((data) => {
        return (
          <Group
            group_name={data.name}
            group_id={data.id}
            is_selected={data.id === group_id}
            key={data.id}
          />
        )
      })}
    </div>
  )
}
