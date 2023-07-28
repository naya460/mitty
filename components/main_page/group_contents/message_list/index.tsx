import { useState, useRef, useEffect } from 'react'
import { DateTime } from 'luxon'

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
  const scroll_pos = useRef(new Map<string, number>());
  const last_group = useRef(null);

  const [loadNext] = useElementList({
    selected_group_id: props.selected_group_id,
    onMessage: (elements) => {
      // メッセージの表示を更新
      setDisplayMessages(() => createDisplay(elements));
    },
    onUpdate: (elements) => {
      // スクロールバーの位置を保存
      if (last_group.current != null) {
        scroll_pos.current.set(last_group.current, ref_messages_div.current.scrollTop);
      }
      last_group.current = props.selected_group_id;

      // メッセージの表示を更2新
      setDisplayMessages(() => createDisplay(elements));
      
      // スクロールバーの位置を設定
      ref_messages_div.current.scrollTo(0, scroll_pos.current.get(props.selected_group_id));
    }
  });

  // 表示を作成する
  const createDisplay = (messages: Element[]): JSX.Element[] => {
    // グループのメッセージを取り出す
    if (messages == null) return null;

    // 表示を作成
    let tmp = [];
    let count = 0;
    let last_message: MessageElement = null;
    messages.slice().reverse().forEach((value) => {
      // メッセージのとき
      if (typeof (value as MessageElement).message_text === "string") {
        value = value as MessageElement;

        // 日付が変わったとき、日付の線を表示
        if (last_message != null) {
          if (new Date(last_message.time).toLocaleDateString() != new Date(value.time).toLocaleDateString()) {
            // 表示を追加
            tmp.unshift(
              <div key={count} className={styles.date}>
                <div className={styles.date_hline} />
                <div className={styles.date_text}>{new Date(value.time).toLocaleDateString()}</div>
                <div className={styles.date_hline} />
              </div>
            );
            ++count;
          }
        } else {
          // 表示を追加
          tmp.unshift(
            <div key={count} className={styles.date}>
              <div className={styles.date_hline} />
              <div className={styles.date_text}>{new Date(value.time).toLocaleDateString()}</div>
              <div className={styles.date_hline} />
            </div>
          );
          ++count;
        }

        // 名前と時刻の表示を切り替え
        // 時間差が5分以内で、ユーザーが同じとき、非表示
        let status = true;
        if (last_message != null) {
          const last_time = DateTime.fromJSDate(new Date(last_message.time));
          const value_time = DateTime.fromJSDate(new Date(value.time));

          const time_diff = value_time.diff(last_time).as("minutes");
          
          if (time_diff <= 5 && last_message.author.user_name === value.author.user_name) {
            status = false;
          }
        }
        last_message = value;

        // 表示を追加
        tmp.unshift(
          <Message
            key={count}
            user_name={value.author.user_name}
            mine={props.user_name == value.author.user_name}
            time={value.time}
            status={status}
          >
            {value.message_text}
          </Message>
        );
      }
      ++count;
    });

    return tmp;
  }

  return (
    <div className={styles.top}>
      <div
        className={styles.messages}
        ref={ref_messages_div}
      >{displayMessages}</div>
      <MessageInput
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}