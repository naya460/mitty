import { useState, useRef } from 'react'

import Message from './message'
import MessageInput from './message_input'
import useElementList, { MessageElement, DateElement, Element } from './element_list'

import styles from './index.css'

interface Props {
  user_name: string,
  selected_group_id: string
}

export default function MessageList(props: Props) {
  const [displayMessages, setDisplayMessages] = useState(null);
  const ref_messages_div = useRef<HTMLDivElement>(null);

  useElementList({
    selected_group_id: props.selected_group_id,
    onMessage: (elements) => {
      // メッセージの表示を更新
      setDisplayMessages(createDisplay(elements));

      // 最新のメッセージまでスクロール
      ref_messages_div.current.scrollTo(0, 0);
    },
    onUpdate: (elements) => {
      // メッセージの表示を更新
      setDisplayMessages(createDisplay(elements));

      // 最新のメッセージまでスクロール
      ref_messages_div.current.scrollTo(0, 0);
    }
  });

  // 表示を作成する
  const createDisplay = (messages: Element[]): JSX.Element[] => {
    // グループのメッセージを取り出す
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

  return (
    <div className={styles.top}>
      <div className={styles.messages} ref={ref_messages_div}>{displayMessages}</div>
      <MessageInput
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}