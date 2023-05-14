import { useRouter } from 'next/router'
import { useState } from 'react'

import GroupList from './group_list'
import GroupContents from './group_contents'

import styles from './index.module.css'

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState(null);

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/user/signout');
    router.reload();
  }
  
  // 表示するグループを変更する関数
  const handleSetSelectedGroupData = (id: string, name: string) => {
    setSelectedGroupId(() => id);
    setSelectedGroupName(() => name);
  }

  return (
    <div className={styles.top}>
      <p>User Name : {props.user_name}</p>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
      <div className={styles.main_view}>
        <GroupList
          setSelectedGroupData={handleSetSelectedGroupData}
          selected_group_id={selectedGroupId}
        />
        <GroupContents
          user_name={props.user_name}
          selected_group_id={selectedGroupId}
          selected_group_name={selectedGroupName}
        />
      </div>
    </div>
  );
}