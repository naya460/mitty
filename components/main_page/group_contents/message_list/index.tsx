import { useState, useEffect, useRef } from 'react'

import CreatePostRequest from 'components/common/create_post_request'
import useWebSocket from 'components/common/useWebSocket'
import Message from './message'
import MessageInput from './message_input'

import styles from './index.module.css'

interface Props {
  user_name: string,
  selected_group_id: string
}

export default function MessageList(props: Props) {
  const message_list = useRef(new Map<String, Object[]>());
  const [displayMessages, setDisplayMessages] = useState(null);
  const ref_messages_div = useRef<HTMLDivElement>(null);
  const selected_group_id = useRef(null);

  selected_group_id.current = props.selected_group_id;

  const [socketSend, cookie] = useWebSocket((message) => {
    if (!message_list.current.has(message.group_id)) {
      message_list.current.set(message.group_id, []);
    }

    message_list.current.set(
      message.group_id,
      [(
        <Message
          key={message_list.current.get(message.group_id).length}
          user_name={message.author.user_name}
          mine={props.user_name == message.author.user_name}
          time={message.time}
        >
          {message.message_text}
        </Message>
      ), ...message_list.current.get(message.group_id)]
    );

    if (selected_group_id.current === message.group_id) {
      setDisplayMessages(() => {
        return message_list.current.get(message.group_id);
      });

      // 最新のメッセージまでスクロール
      ref_messages_div.current.scrollTo(0, 0);
    }
  });

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
    let tmp = [];
    for (let i in messages) {
      // メッセージを追加
      tmp.unshift(
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
    message_list.current.set(selected_group_id.current, tmp);
    setDisplayMessages(tmp);

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
        socketSend={socketSend}
        cookie={cookie}
      />
    </div>
  );
}