import { useRouter } from 'next/router'
import { useState } from 'react'

import MessageList from './message_list'
import GroupList from './group_list'

import styles from './index.module.css'

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();
  const [displayGroupId, setDisplayGroupId] = useState(null);

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/user/signout');
    router.reload();
  }
  
  // 表示するグループを変更する関数
  const handleSetDisplayGroupId = (id: string) => {
    setDisplayGroupId(() => id);
  }

  return (
    <div className={styles.top}>
      <p>User Name : {props.user_name}</p>
      <p>Group Id : {displayGroupId}</p>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
      <div className={styles.main_view}>
        <GroupList setDisplayGroupId={handleSetDisplayGroupId}/>
        <MessageList user_name={props.user_name} group_id={displayGroupId}/>
      </div>
    </div>
  );
}