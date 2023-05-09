import { useRouter } from 'next/router'

import MessageList from './message_list'

import styles from './index.module.css'

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/user/signout');
    router.reload();
  }

  return (
    <div className={styles.top}>
      <p>User Name : {props.user_name}</p>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
      <MessageList user_name={props.user_name}/>
    </div>
  );
}