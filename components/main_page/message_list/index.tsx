import { useState, useEffect } from 'react'
import {DateTime} from 'luxon'

import Message from './message'
import MessageInput from './message_input'

import styles from './index.module.css'

interface Props {
  user_name: string
}

export default function MessageList(props: Props) {
  const [displayMessages, setDisplayMessages] = useState(null);

  useEffect(() => {
    (async () => {
      // メッセージを取得する
      const res = await fetch('api/message/get');
      const messages = await res.json();
      // メッセージの表示を作成
      let display_msg = [];
      for (let i in messages) {
        // メッセージを追加
        display_msg.unshift(
          <Message
            key={i}
            user_name={messages[i].author.user_name}
            mine={props.user_name == messages[i].author.user_name}
            time={messages[i].time}
          >
            {messages[i].message_text}
          </Message>
        );
      }
      setDisplayMessages(display_msg);
    })()
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.messages}>{displayMessages}</div>
      <MessageInput />
    </div>
    
  );
}