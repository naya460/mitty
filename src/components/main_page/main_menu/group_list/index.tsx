import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import styles from './index.css'

import CreatePostRequest from 'components/common/create_post_request'
import Group from './group'

interface Props {
  setSelectedGroupData: (id: string, name: string) => void;
  selected_group_id: string;
}

export default function GroupList(props: Props) {
  const router = useRouter();
  const [groupList, setGroupList] = useState<{ id: string, name: string}[]>(null);
  const [displayGroups, setDisplayGroups] = useState(null);

  // グループの作成関数
  const handleCreateGroup = async (event) => {
    event.preventDefault();

    // 送信するリクエストを作成
    const options = CreatePostRequest({
      group_name: event.target.group_name.value
    });

    await fetch('api/group/create', options);
    router.reload();
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
      const res = await fetch('api/group/get');
      const groups = JSON.parse(await res.json());
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
            onClick={() => {
              // router optionを作成
              const option = {
                pathname: '/',
                query: { group_id: groups[i].group_id }
              };

              // グループを選択していないとき、ページを追加して移動
              if (router.query.group_id == null) {
                router.push(option);
              }
              // グループを選択しているとき、ページを置き換え
              else {
                router.replace(option);
              }
            }}
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