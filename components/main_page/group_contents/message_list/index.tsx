import { useState, useEffect, useRef } from 'react'

import CreatePostRequest from 'components/common/create_post_request'
import useWebSocket from 'components/common/useWebSocket'
import Message from './message'
import MessageInput from './message_input'

import styles from './index.css'

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

  // 表示を追加する
  const addDisplay = (
    group_id: string,
    element: JSX.Element
  ) => {
    // グループを読み込んでいないとき作成
    if (!message_list.current.has(group_id)) {
      message_list.current.set(group_id, []);
    }

    // 表示を追加
    message_list.current.set(
      group_id,
      [element, ...message_list.current.get(group_id)]
    );
  }

  // メッセージを追加する
  const addMessage = (
    message: {
      group_id: string,
      message_text: string,
      author: { user_name: string},
      time: Date,
    },
  ) => {
    // グループを読み込んでいないとき作成
    if (!message_list.current.has(message.group_id)) {
      message_list.current.set(message.group_id, []);
    }

    // メッセージの表示を作成
    const tmp = (
      <Message
        key={message_list.current.get(message.group_id).length}
        user_name={message.author.user_name}
        mine={props.user_name == message.author.user_name}
        time={message.time}
      >
        {message.message_text}
      </Message>
    );

    // 表示を追加
    addDisplay(message.group_id, tmp);
  }

  // 日付を追加する
  const addDate = (
    group_id: string,
    date: Date,
  ) => {
    // グループを読み込んでいないとき作成
    if (!message_list.current.has(group_id)) {
      message_list.current.set(group_id, []);
    }
    
    // 日付の表示を作成
    const tmp = (
      <div key={message_list.current.get(group_id).length} className={styles.date}>
        <div className={styles.date_hline} />
        <div className={styles.date_text}>{date.toLocaleDateString()}</div>
        <div className={styles.date_hline} />
      </div>
    );

    // 表示を追加
    addDisplay(group_id, tmp);
  }

  useWebSocket((message) => {
    // グループのメッセージを読み込んでいないとき、無視
    if (!message_list.current.has(message.group_id)) {
      return;
    }

    addMessage(message);

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
    let before_date = null;
    let offset = 0;
    for (let i in messages) {
      const date = new Date(messages[i].time);
      // 日付が変わったとき
      if (before_date != null) {
        if (before_date != date.toLocaleDateString()) {
          addDate(props.selected_group_id, date);
          offset++;
        }
      } else {
        addDate(props.selected_group_id, date);
        offset++;
      }
      before_date = date.toLocaleDateString();

      // メッセージを追加
      addMessage({...messages[i], group_id: props.selected_group_id});
      offset++;
    }

    // 最新のメッセージまでスクロール
    ref_messages_div.current.scrollTo(0, 0);
  }

  useEffect(() => {
    (async () => {
      if (!message_list.current.has(props.selected_group_id)) {
        await updateMessages();
      }
      setDisplayMessages(message_list.current.get(props.selected_group_id));
    })();
  }, [props.selected_group_id]);

  return (
    <div className={styles.top}>
      <div className={styles.messages} ref={ref_messages_div}>{displayMessages}</div>
      <MessageInput
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}