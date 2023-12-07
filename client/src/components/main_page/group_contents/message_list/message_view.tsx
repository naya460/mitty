import React, { useState, useRef, useEffect } from 'react';
import { DateTime } from 'luxon';

import Message from './message';
import useElementList, { Element } from './element_list';

import styles from './message_view.css';

interface Props {
  user_name: string,
  selected_group_id: string
}

export default function MessageView(props: Props) {
  const [displayMessages, setDisplayMessages] = useState<React.ReactElement[]>([]);
  const count = useRef(0);
  const obs_ref = useRef();
  const [reachEnd, setReachEnd] = useState(false);

  const [loadNext] = useElementList({
    group_id: props.selected_group_id,
    onMessage: (elements) => {
      try {
        setDisplayMessages([...createDisplay(elements)]);
      } catch {
        console.log("oh")
      }
    },
    onUpdate: (elements) => {
      try {
        setDisplayMessages([...createDisplay(elements)]);
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
    let last_message: Element = null;
    messages.slice().reverse().forEach((value) => {
      // メッセージのとき
      if (typeof (value as Element).message_text === "string") {
        value = value as Element;

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

  useEffect(() => {
    // observerを作成
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        (async () => {
          setReachEnd(await loadNext());
        })();
      }
    });

    // ターゲットを登録
    if (obs_ref.current == undefined) return;
    observer.observe(obs_ref.current);

    return () => {
      if (obs_ref.current == undefined) return;
      observer.unobserve(obs_ref.current)
    }
  }, [obs_ref.current]);

  return (
    <div className={styles.top}>
      <div className={styles.centering}>
        <div className={styles.message_list}>
          <div
            ref={obs_ref}
            className={styles.list_end}
          >{(() => {
            if (reachEnd) {
              return "メッセージの最後です";
            } else {
              return "…… 読み込み中 ……";
            }
          })()}</div>
          {displayMessages}
        </div>
      </div>
    </div>
  );
}
