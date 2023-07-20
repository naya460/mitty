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

type MessageElement = {
  message_text: string,
  author: { user_name: string },
  time: Date,
}

type DateElement = {
  date: Date,
}

type DisplayElements = MessageElement | DateElement;

export default function MessageList(props: Props) {
  const message_list = useRef(new Map<String, DisplayElements[]>());
  const [displayMessages, setDisplayMessages] = useState(null);
  const ref_messages_div = useRef<HTMLDivElement>(null);
  const selected_group_id = useRef(null);

  selected_group_id.current = props.selected_group_id;

  // 表示を作成する
  const createDisplay = (group_id: string): JSX.Element[] => {
    // グループのメッセージを取り出す
    const messages = message_list.current.get(group_id);
    if (messages == null) return null;

    // 表示を作成
    let tmp = [];
    let count = 0;
    messages.forEach((value) => {
      // メッセージのとき
      if (typeof (value as MessageElement).message_text === "string") {
        value = value as MessageElement;
        tmp.push(
          <Message
            key={count}
            user_name={value.author.user_name}
            mine={props.user_name == value.author.user_name}
            time={value.time}
          >
            {value.message_text}
          </Message>
        );
      }
      // 日付のとき
      else {
        value = value as DateElement;
        tmp.push(
          <div key={count} className={styles.date}>
            <div className={styles.date_hline} />
            <div className={styles.date_text}>{value.date.toLocaleDateString()}</div>
            <div className={styles.date_hline} />
          </div>
        );
      }
      ++count;
    });

    return tmp;
  }

  // 要素を追加する
  const addElement = (
    group_id: string,
    element: DisplayElements,
  ) => {
    // グループを読み込んでいないとき作成
    if (!message_list.current.has(group_id)) {
      message_list.current.set(group_id, []);
    }

    // 要素を追加
    message_list.current.set(
      group_id,
      [element, ...message_list.current.get(group_id)]
    );
  }

  useWebSocket((message) => {
    // グループのメッセージを読み込んでいないとき、無視
    if (!message_list.current.has(message.group_id)) {
      return;
    }
    
    addElement(selected_group_id.current, message);

    if (selected_group_id.current === message.group_id) {
      setDisplayMessages(createDisplay(selected_group_id.current));

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
    let before_date = null;
    for (let i in messages) {
      const date = new Date(messages[i].time);
      // 日付が変わったとき
      if (before_date != null) {
        if (before_date != date.toLocaleDateString()) {
          addElement(props.selected_group_id, {date});
        }
      } else {
        addElement(props.selected_group_id, {date});
      }
      before_date = date.toLocaleDateString();

      // メッセージを追加
      addElement(props.selected_group_id, messages[i]);
    }

    // 最新のメッセージまでスクロール
    ref_messages_div.current.scrollTo(0, 0);
  }

  useEffect(() => {
    (async () => {
      if (!message_list.current.has(props.selected_group_id)) {
        await updateMessages();
      }
      setDisplayMessages(createDisplay(props.selected_group_id));
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