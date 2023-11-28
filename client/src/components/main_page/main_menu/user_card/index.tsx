import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './index.css';

interface Props {
  user_name: string,
}

export default function UserCard(props: Props) {
  const router = useRouter();

  const [displayPopup, setDisplayPopup] = useState(false);

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch(
      `http://${location.hostname}:9090/user/signout`,
      { mode: 'cors', credentials: 'include' }
    );
    router.reload();
  }

  return (
    <>
      <div
        className={styles.top}
        onClick={() => setDisplayPopup(true)}
      >
        <div className={styles.user_name}>{props.user_name}</div>
      </div>
      { /* popup  */ }
      <div className={`
        ${styles.popup}
        ${(!displayPopup) && styles.popup_hidden}
      `}>
        <div
          className={styles.popup_background}
          onClick={() => setDisplayPopup(false)}
        />
        <div className={styles.popup_contents}>
          <div>{props.user_name}</div>
          <a href='/' onClick={handleSignOut}>Sign Out</a>
        </div>
      </div>
    </>
  );
}
