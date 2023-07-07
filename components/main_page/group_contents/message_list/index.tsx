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
  const message_list = useRef([]);
  const [displayMessages, setDisplayMessages] = useState(null);
  const ref_messages_div = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket>(null);
  const cookie = useRef<String>(null);
  const selected_group_id = useRef(null);

  selected_group_id.current = props.selected_group_id;

  // websocketを初期化
  useEffect(() => {
    (async () => {
      const a = await fetch('api/use_ws');
      cookie.current = await a.text();
      console.log(cookie.current);
      socketRef.current = new WebSocket(`ws://${location.hostname}:8080/`);
      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.group_id != selected_group_id.current) return;

        setDisplayMessages(() => {
          message_list.current = [(
            <Message
              key={message_list.current.length}
              user_name={message.author.user_name}
              mine={props.user_name == message.author.user_name}
              time={message.time}
            >
              {message.message_text}
            </Message>
          ), ...message_list.current];
          return message_list.current;
        });

      // 最新のメッセージまでスクロール
      ref_messages_div.current.scrollTo(0, 0);
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
    message_list.current = [];
    for (let i in messages) {
      // メッセージを追加
      message_list.current.unshift(
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
    setDisplayMessages(message_list.current);

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
        socket={socketRef.current}
        cookie={cookie.current}
      />
    </div>
    
  );
}