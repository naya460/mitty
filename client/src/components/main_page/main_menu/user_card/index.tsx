import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from './index.css';
import PopupMenu from 'components/common/popup_menu';
import { MainContext } from 'components/main_page/contexts';
import Button from 'components/common/button';

export default function UserCard() {
  const router = useRouter();
  const { user_name } = useContext(MainContext);

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
    <div className={styles.top}>
      { /* button */ }
      <Button
        className={styles.button}
        onClick={() => setDisplayPopup(true)}
      >
        <div className={styles.user_name}>{user_name}</div>
      </Button>
      { /* popup  */ }
      <PopupMenu
        display={displayPopup}
        setHidden={() => setDisplayPopup(false)}
      >
        <div>{user_name}</div>
        <a href='/' onClick={handleSignOut}>Sign Out</a>
      </PopupMenu>
    </div>
  );
}
