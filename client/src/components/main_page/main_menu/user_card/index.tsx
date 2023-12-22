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
import User from 'components/main_page/common/user';

export default function UserCard() {
  const router = useRouter();
  const { user_id } = useContext(MainContext);

  const [displayPopup, setDisplayPopup] = useState(false);

  const [dialog, setDialog] = useState(false);
  const textbox_ref = useRef<TextBoxRef>();
  
  const [imageUrl, setImageUrl] = useState('');
  const [iconDialog, setIconDialog] = useState(false);
  const canvas_ref = useRef<HTMLCanvasElement>();

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
      { ...options, mode: 'cors', credentials: 'include' }
    );
    textbox_ref.current.clearText();
  }

  // アイコンを変更する処理
  const handleSetIcon = async (event) => {
    event.preventDefault();

    const new_icon = canvas_ref.current.toDataURL('image/jpeg');

    const options = CreatePostRequest(
      { icon: new_icon },
    );

    await fetch(
      `http://${location.hostname}:9090/user/set_icon`,
      { ...options, mode: 'cors', credentials: 'include' }
    );
  }

  // ファイルを読み込み時の処理
  const handleChange = async (event) => {
    event.preventDefault();
    
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const ctx = canvas_ref.current.getContext('2d');
        // 縦長のとき
        if (image.height >= image.width) {
          ctx.drawImage(
            image, 0, -image.height * (256 / image.width) / 2 + 128,
            256, image.height * (256 / image.width)
          );
        }
        // 横長のとき
        else {
          ctx.drawImage(
            image, -image.width * (256 / image.height) / 2 + 128, 0,
            image.width * (256 / image.height), 256
          );
        }
      }
      image.src = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.top}>
      { /* button */ }
      <Button
        className={styles.button}
        onClick={() => setDisplayPopup(true)}
      >
        <User user_id={user_id} />
      </Button>
      { /* popup  */ }
      <PopupMenu
        display={displayPopup}
        setHidden={() => setDisplayPopup(false)}
        list={[
          {
            text: '表示名を変更',
            onClick: () => { setDisplayPopup(false); setDialog(true); }
          }, {
            text: 'アイコンを変更',
            onClick: () => { setDisplayPopup(false); setIconDialog(true); }
          }, {
            text: 'Sign Out', onClick: handleSignOut
          },
        ]}
      />
      { /* dialog */ }
      <FormDialog
        title='表示名を変更'
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
      <FormDialog
        title='アイコンを変更'
        display={iconDialog}
        setHidden={() => setIconDialog(false)}
        onSubmit={handleSetIcon}
        accept_text='変更'
      >
        <canvas
          width='256px' height='256px'
          ref={canvas_ref}
          style={{borderRadius: '128px'}}
        />
        <input id='icon' type='file' accept='image/*' onChange={handleChange} />
      </FormDialog>
    </div>
  );
}
