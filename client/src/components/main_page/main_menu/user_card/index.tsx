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
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './index.css';
import PopupMenu from 'components/common/popup_menu';
import { MainContext } from 'components/main_page/contexts';
import Button from 'components/common/button';
import { FormDialog } from 'components/common/dialog';
import Textbox, { TextBoxRef } from 'components/common/textbox';
import CreatePostRequest from 'components/common/create_post_request';

export default function UserCard() {
  const router = useRouter();
  const { user_name } = useContext(MainContext);

  const [displayPopup, setDisplayPopup] = useState(false);

  const [dialog, setDialog] = useState(false);
  const textbox_ref = useRef<TextBoxRef>();

  const [imageUrl, setImageUrl] = useState('');

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch(
      `http://${location.hostname}:9090/user/signout`,
      { mode: 'cors', credentials: 'include' }
    );
    router.reload();
  }

  // 表示名を変更する処理
  const handleRename = async (event) => {
    event.preventDefault();

    const options = CreatePostRequest(
      { new_name: event.target.new_name.value },
    );

    await fetch(
      `http://${location.hostname}:9090/user/rename`,
      { ...options, mode: 'cors', credentials: 'include',  }
    );
    textbox_ref.current.clearText();
  }

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://${location.hostname}:9090/user/get_icon`,
        { mode: 'cors', credentials: 'include' }
      );
      const url = URL.createObjectURL(await res.blob());
      setImageUrl(url);
    })();
  }, []);

  return (
    <div className={styles.top}>
      { /* button */ }
      <Button
        className={styles.button}
        onClick={() => setDisplayPopup(true)}
      >
        <div className={styles.user}>
          <img src={imageUrl} className={styles.icon} />
          <div className={styles.user_name}>{user_name}</div>
        </div>
      </Button>
      { /* popup  */ }
      <PopupMenu
        display={displayPopup}
        setHidden={() => setDisplayPopup(false)}
        list={[
          {
            text: 'Change Display Name',
            onClick: () => { setDisplayPopup(false); setDialog(true); }
          }, {
            text: 'Sign Out', onClick: handleSignOut
          },
        ]}
      />
      { /* dialog */ }
      <FormDialog
        title={'ユーザーの表示名を変更'}
        display={dialog}
        setHidden={() => setDialog(false)}
        onSubmit={handleRename}
        accept_text='変更'
      >
        <Textbox
          single={true}
          name='new_name'
          autoComplete='off'
          required={true}
          styleOnDark={true}
          ref={textbox_ref}
        />
      </FormDialog>
    </div>
  );
}
