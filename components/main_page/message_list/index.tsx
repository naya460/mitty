import { useState, useEffect } from 'react'

import Message from './message'
import MessageInput from './message_input'

import styles from './index.module.css'

interface Props {
  user_name: string,
  group_id: string
}

export default function MessageList(props: Props) {
  const [displayMessages, setDisplayMessages] = useState(null);

  useEffect(() => {
    (async () => {
      // group_idが指定されていないとき、無視
      if (props.group_id == null) {
        return;
      }

      // 送信するデータを作成
      const data = {
        group_id: props.group_id
      };

      const JSONdata = JSON.stringify(data);

      // 送信するリクエスト内容を作成
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };

      // メッセージを取得する
      const res = await fetch('api/message/get', options);
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
  }, [props.group_id]);

  return (
    <div className={styles.top}>
      <div className={styles.messages}>{displayMessages}</div>
      <MessageInput group_id={props.group_id}/>
    </div>
    
  );
}