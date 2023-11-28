import { useRouter } from 'next/router';

import styles from "./index.css";

interface Props {
  user_name: string,
}

export default function UserCard(props: Props) {
  const router = useRouter();

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch(
      `http://${location.hostname}:9090/user/signout`,
      { mode: 'cors', credentials: 'include' }
    );
    router.reload();
  }

  return (
    <div className={styles.top}>
      <div className={styles.user_name}>User : {props.user_name}</div>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
    </div>
  );
}
