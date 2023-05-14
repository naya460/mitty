import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import styles from './index.module.css'

import CreatePostRequest from 'components/common/create_post_request'
import Group from './group'

interface Props {
  setSelectedGroupData: (id: string, name: string) => void;
  selected_group_id: string;
}

export default function GroupList(props: Props) {
  const router = useRouter();
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

  useEffect(() => {
    (async () => {
      // グループを取得
      const res = await fetch('api/group/get');
      const groups = await res.json();
      // グループの表示を作成
      let display_groups = [];
      for (let i in groups) {
        // グループの表示を追加
        display_groups.push(
          <Group
            onClick={() => {
              props.setSelectedGroupData(groups[i].group_id, groups[i].group_name);
            }}
            group_name={groups[i].group_name}
            group_id={groups[i].group_id}
            selected_group_id={props.selected_group_id}
            key={i}
          />
        )
      }
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