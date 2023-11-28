import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './index.css';
import Popup from 'components/common/popup';

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
      <Popup
        display={displayPopup}
        setHidden={() => setDisplayPopup(false)}
      >
        <div>{props.user_name}</div>
        <a href='/' onClick={handleSignOut}>Sign Out</a>
      </Popup>
    </>
  );
}
