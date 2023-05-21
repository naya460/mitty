import { useState, useEffect, useRef } from 'react'

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
  const ref_messages_div = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket>(null);

  // websocketを初期化
  useEffect(() => {
    (async () => {
      await fetch('/api/ws');
      socketRef.current = new WebSocket('ws://192.168.1.31:3000/api/ws');
      socketRef.current.onmessage = (event) => {
        console.log(event.data);
      }
    })();
  }, []);

  const updateMessages = async () => {
    // group_idが指定されていないとき、空にする
    if (props.selected_group_id == null) {
      setDisplayMessages(null);
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

    // 最新のメッセージまでスクロール
    ref_messages_div.current.scrollTo(0, 0);
  }

  useEffect(() => {
    (async () => {
      await updateMessages();
    })();
  }, [props.selected_group_id]);

  return (
    <div className={styles.top}>
      <div className={styles.messages} ref={ref_messages_div}>{displayMessages}</div>
      <MessageInput
        selected_group_id={props.selected_group_id}
        updateMessages={updateMessages}
      />
    </div>
    
  );
}