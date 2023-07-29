import { useState, useRef, RefObject, createRef } from 'react'
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
  const [displayMessages, setDisplayMessages] = useState(new Map<string, JSX.Element[]>());
  const message_divs = useRef(new Map<string, RefObject<HTMLDivElement>>);
  const loading = useRef(new Map<string, boolean>());

  const [loadNext] = useElementList({
    selected_group_id: props.selected_group_id,
    onMessage: (elements) => {
      // メッセージの表示を更新
      setDisplayMessages((prev) => {
        prev.set(
          props.selected_group_id,
          createDisplay(elements)
        );
        return new Map(prev);
      });
    },
    onUpdate: (elements) => {
      // メッセージの表示を更新
      setDisplayMessages((prev) => {
        prev.set(
          props.selected_group_id,
          createDisplay(elements)
        );
        return new Map(prev);
      });
      // オブジェクトのRefを作成
      if (!message_divs.current.has(props.selected_group_id)) {
        message_divs.current.set(props.selected_group_id, createRef<HTMLDivElement>());
        loading.current.set(props.selected_group_id, false);
      }
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

  const handle_scroll = async (group_id: string) => {
    // メッセージの参照を入手
    const ref = message_divs.current.get(group_id).current;
    if (ref == null) return;

    // 上の方にいるかを計算
    const will_load = (ref.scrollHeight + ref.scrollTop) < 10 * ref.clientHeight;

    // 上の方で、最後まで読み込まれておらず、現在読み込み中でないとき、読み込む
    if (will_load && loading.current.get(group_id) != null && loading.current.get(group_id) == false) {
      loading.current.set(group_id, true);  // 読み込み開始にする
      if (await loadNext()) {
        loading.current.set(group_id, null);  // 読み込み完了にする
      } else {
        loading.current.set(group_id, false); // 読み込み可能にする
      }
    }
  }

  return (
    <div className={styles.top}>
      <div className={styles.message_list}>
        {Array.from(displayMessages).map(value => {
          return (
            <div
              ref={message_divs.current.get(value[0])}
              key={value[0]}
              className={`${styles.messages} ${(props.selected_group_id != value[0]) && styles.messages_hidden}`}
              onScroll={() => handle_scroll(value[0])}
            >{value[1]}</div>
          );
        })}
        </div>
      
      <MessageInput
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}