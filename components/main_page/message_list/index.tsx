import { useState, useEffect } from 'react'

import CreatePostRequest from 'components/common/create_post_request'
import Message from './message'
import MessageInput from './message_input'

import styles from './index.module.css'

interface Props {
  user_name: string,
  selected_group_id: string
}

export default function MessageList(props: Props) {
  const [displayMessages, setDisplayMessages] = useState(null);

  useEffect(() => {
    (async () => {
      // group_idが指定されていないとき、無視
      if (props.selected_group_id == null) {
        return;
      }

      // 送信するリクエストを作成
      const options = CreatePostRequest({
        group_id: props.selected_group_id
      });

      // メッセージを取得する
      const res = await fetch('api/message/get', options);
      if (!res.ok) {
        const resText = await res.text();
        console.log(resText);
        return;
      }
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
  }, [props.selected_group_id]);

  return (
    <div className={styles.top}>
      <div className={styles.messages}>{displayMessages}</div>
      <MessageInput selected_group_id={props.selected_group_id}/>
    </div>
    
  );
}