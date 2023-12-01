import React, { useState, useRef, RefObject, createRef } from 'react'
import { DateTime } from 'luxon'

import Message from './message'
import MessageInput from './message_input'
import useElementList, { MessageElement, DateElement, Element } from './element_list'

import styles from './index.css'

interface Props {
  user_name: string,
  selected_group_id: string
}

export default function MessageView(props: Props) {
  const [displayMessages, setDisplayMessages] = useState<React.ReactElement[]>([]);
  const message_divs = useRef<RefObject<HTMLDivElement>>();
  const loading = useRef(false);
  const count = useRef(0);

  const [loadNext] = useElementList({
    selected_group_id: props.selected_group_id,
    onMessage: (elements) => {
      try {
        setDisplayMessages([...displayMessages, ...createDisplay(elements)]);
      } catch {
        console.log("oh")
      }
    },
    onUpdate: (elements) => {
      try {
        setDisplayMessages([...displayMessages, ...createDisplay(elements)]);
      } catch {
        console.log("oh")
      }
    }
  });
  
  // 表示を作成する
  const createDisplay = (messages: Element[]): React.ReactElement[] => {
    // グループのメッセージを取り出す
    if (messages == null) return null;

    // 表示を作成
    let tmp: React.ReactElement[] = new Array;
    let last_message: MessageElement = null;
    messages.slice().reverse().forEach((value) => {
      // メッセージのとき
      if (typeof (value as MessageElement).message_text === "string") {
        value = value as MessageElement;

        // 日付が変わったとき、日付の線を表示
        if (last_message != null) {
          if (new Date(last_message.time).toLocaleDateString() != new Date(value.time).toLocaleDateString()) {
            // 表示を追加
            tmp.push(
              <div key={count.current} className={styles.date}>
                <div className={styles.date_hline} />
                <div className={styles.date_text}>{new Date(value.time).toLocaleDateString()}</div>
                <div className={styles.date_hline} />
              </div>
            );
            ++count.current;
          }
        } else {
          // 表示を追加
          tmp.push(
            <div key={count.current} className={styles.date}>
              <div className={styles.date_hline} />
              <div className={styles.date_text}>{new Date(value.time).toLocaleDateString()}</div>
              <div className={styles.date_hline} />
            </div>
          );
          ++count.current;
        }

        // 名前と時刻の表示を切り替え
        // 時間差が5分以内で、ユーザーが同じとき、非表示
        let status = true;
        if (last_message != null) {
          const last_time = DateTime.fromJSDate(new Date(last_message.time));
          const value_time = DateTime.fromJSDate(new Date(value.time));

          const time_diff = value_time.diff(last_time).as("minutes");
          
          if (time_diff <= 5 && last_message.author.display_name === value.author.display_name) {
            status = false;
          }
        }
        last_message = value;

        // 表示を追加
        tmp.push(
          <Message
            key={count.current}
            display_name={value.author.display_name}
            mine={props.user_name == value.author.display_name}
            time={value.time}
            status={status}
          >
            {value.message_text}
          </Message>
        );
      }
      ++count.current;
    });

    return tmp;
  }

  const handle_scroll = async (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // メッセージの参照を入手
    const target = event.currentTarget;

    // 上の方にいるかを計算
    const will_load = target.scrollHeight - target.clientHeight * 2 <= -target.scrollTop;

    // 上の方で、最後まで読み込まれておらず、現在読み込み中でないとき、読み込む
    if (will_load && loading.current != null && loading.current == false) {
      console.log("load")
      loading.current = true;  // 読み込み開始にする
      if (await loadNext()) {
        loading.current = null;  // 読み込み完了にする
      } else {
        loading.current = false; // 読み込み可能にする
      }
    }
  }

  return (
    <div
      className={styles.message_list}
      onScroll={(event) => handle_scroll(event)}
    >
      <div className={styles.messages_center}>
        <div ref={message_divs.current} className={styles.messages}>
          {displayMessages}
        </div>
      </div>
    </div>
  );
}
