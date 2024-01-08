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

import react, { useContext, useRef, useState } from 'react';

import styles from './message_input.css';
import { MainContext } from 'components/main_page/contexts';
import TextBox, { TextBoxRef } from 'components/common/textbox';
import Button, { LabelButton } from 'components/common/button';
import mittyFetch from 'utils/fetch';
import ImagePreview from 'components/main_page/common/image_preview';

export default function MessageInput() {
  const textbox_ref = useRef<TextBoxRef>();
  const [fileUrl, setFileUrl] = useState('');

  const { group_id } = useContext(MainContext);

  const sendMessage = async () => {
    const text = textbox_ref.current.text;
    if (text === '') return;

    // 画像を送信
    const file_id = await (async () => {
      if (fileUrl === '') return;
      const res = await mittyFetch({
        route: "file/add",
        post_data: {
          file: fileUrl,
        },
      });
      setFileUrl('');
      return await res.text();
    })();

    // メッセージを送信
    await mittyFetch({
      route: "message/send",
      post_data: {
        message_text: text,
        group_id: group_id,
        files: JSON.stringify([file_id]),
      }
    });

    // 入力欄を初期化
    textbox_ref.current.clearText();
  }

  const handleSend = async (event) => {
    event.preventDefault();

    // メッセージを送信
    sendMessage();

    // TextBoxをリセット
    textbox_ref.current.clearText();
  };

  const handleKeyDown: react.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.ctrlKey || event.shiftKey || event.altKey) {
      if (event.key == "Enter") {
        sendMessage();
      }
    }
  }

  const disabled = group_id == null;

  const handleFileChange: react.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files[0];
    if (file === undefined) {
      setFileUrl('');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileUrl(reader.result as string);

    }
    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.top}>
      {(() => {
        if (fileUrl !== '') {
          return (
            <div className={styles.images}>
              <ImagePreview src={fileUrl} />
            </div>
          );
        }
      })()}
      <form onSubmit={handleSend} className={styles.form}>
        <input
          type="file"
          id="file"
          accept="image/*"
          style={{display: "none"}}
          onChange={handleFileChange}
        />
        <LabelButton for="file">
          ＋
        </LabelButton>
        <TextBox
          name='message'
          autoComplete='off'
          className={styles.message_box}
          maxViewLine={5}
          onKeyDown={handleKeyDown}
          required={true}
          ref={textbox_ref}
        />
        <Button
          type='submit'
          accent={true}
          disabled={disabled}
        >Send</Button>
      </form>
    </div>
  );
}
