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

import react, { useContext, useRef } from 'react';

import styles from './message_input.css';
import { MainContext } from 'components/main_page/contexts';
import TextBox, { TextBoxRef } from 'components/common/textbox';
import Button from 'components/common/button';
import CreatePostRequest from 'components/common/create_post_request';

export default function MessageInput() {
  const textbox_ref = useRef<TextBoxRef>();

  const { group_id } = useContext(MainContext);

  const sendMessage = async () => {
    const text = textbox_ref.current.text;
    if (text === '') return;

    // 送信するリクエストを作成
    const options = CreatePostRequest({
      message_text: text,
      group_id: group_id
    });

    // メッセージを送信
    await fetch(
      `http://${location.hostname}:9090/message/send`,
      { ...options, mode: 'cors', credentials: 'include' }
    );

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

  return (
    <div className={styles.top}>
      <form onSubmit={handleSend} className={styles.form}>
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
          className={styles.send_button}
        >Send</Button>
      </form>
    </div>
  );
}
