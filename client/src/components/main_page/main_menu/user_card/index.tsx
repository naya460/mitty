// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
        list={[{ text: 'Sign Out', onClick: handleSignOut }]}
      />
    </div>
  );
}
