import { useRouter } from 'next/router'
import react, { useState } from 'react'

import CreatePostRequest from 'components/common/create_post_request';

import styles from './message_input.module.css'

interface Props {
  selected_group_id: string;
  updateMessages: () => void;
  socket: WebSocket;
  cookie: String;
}

export default function MessageInput(props: Props) {
  const [text, setText] = useState('');
  const [lineCount, setLineCount] = useState(1);

  const handleSend = async (event) => {
    event.preventDefault();
    
    // 送信するリクエストを作成
    const message = {
      cookie: props.cookie,
      message: event.target.message.value,
      group_id: props.selected_group_id
    };

    // メッセージを送信
    if (props.socket.OPEN) {
      props.socket.send(JSON.stringify(message));
    }
    // 表示を更新
    props.updateMessages();
    setLineCount(1);
    // 入力欄をリセット
    setText('');
  }

  const handleChange: react.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
    const length = event.target.value.split('\n').length;
    setLineCount(Math.min(length, 5));
  }

  return (
    <div className={styles.top}>
      <form onSubmit={handleSend} className={styles.form}>
        <textarea
          name='message'
          autoComplete='off'
          className={styles.message_box}
          style={{height: `${lineCount * 1.5}rem`}}
          value={text}
          onChange={handleChange}
          required
        />
        <button type='submit' className={styles.send_button}>Send</button>
      </form>
    </div>
  );
}