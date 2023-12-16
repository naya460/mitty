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

import React, { useRef, useState } from 'react';

import useWebSocket from 'components/common/useWebSocket';
import Textbox, { TextBoxRef } from 'components/common/textbox';
import Button from 'components/common/button';
import { FormDialog } from 'components/common/dialog';

export default function CreateGroupButton() {
  const [dialog, setDialog] = useState(false);
  const textbox_ref = useRef<TextBoxRef>();

  const [socketSend] = useWebSocket();

  // グループの作成関数
  const handleCreateGroup = async (event) => {
    event.preventDefault();

    // 送信するリクエストを作成
    const message = {
      route: 'group/create',
      group_name: event.target.group_name.value
    }
    
    // メッセージを送信
    socketSend(message);

    // 中身をリセット
    textbox_ref.current.clearText();
  }

  return (
    <>
      <Button onClick={() => setDialog(true)}>Create Group</Button>
      <FormDialog
        title={'グループを作成'}
        display={dialog}
        setHidden={() => setDialog(false)}
        onSubmit={handleCreateGroup}
        accept_text='作成'
      >
        <Textbox
          single={true}
          name='group_name'
          autoComplete='off'
          required={true}
          styleOnDark={true}
          ref={textbox_ref}
        />
      </FormDialog>
    </>
  );
}