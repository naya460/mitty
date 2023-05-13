import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import styles from './index.module.css'

interface Props {
  setDisplayGroupId: (id: string) => void,
}

export default function GroupList(props: Props) {
  const router = useRouter();
  const [displayGroups, setDisplayGroups] = useState(null);

  // グループの作成関数
  const handleCreateGroup = async (event) => {
    event.preventDefault();

    // 送信するデータを作成
    const data = {
      group_name: event.target.group_name.value
    };

    const JSONdata = JSON.stringify(data);

    // 送信するリクエスト内容を作成
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

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
          <button
            onClick={() => {
              props.setDisplayGroupId(groups[i].group_id);
            }}
            key={i}
          >
            {groups[i].group_name}
          </button>
        )
      }
      setDisplayGroups(display_groups);
    })()
  }, [])

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