import { useState } from 'react';

import styles from './create.css';

import useWebSocket from 'components/common/useWebSocket';
import Textbox from 'components/common/textbox';
import Button from 'components/common/button';
import Dialog from 'components/common/dialog';

export default function CreateGroupButton() {
  const [dialog, setDialog] = useState(false);

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
  }

  return (
    <>
      <Button onClick={() => setDialog(true)}>Create Group</Button>
      <Dialog
        title={'グループを作成'}
        display={dialog}
        setHidden={() => setDialog(false)}
      >
        <form
          className={styles.form}
          onSubmit={handleCreateGroup}
        >
          <Textbox
            single={true}
            name='group_name'
            autoComplete='off'
            required={true}
            styleOnDark={true}
          />
          <Button type='submit' accent={true}>+</Button>
        </form>
      </Dialog>
    </>
  );
}
