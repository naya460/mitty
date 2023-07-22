import react from 'react'
import {DateTime} from 'luxon'

import styles from './message.css'

interface Props {
  user_name: string,
  mine: boolean,
  time: Date,
  status?: boolean,
  children?: react.ReactNode,
}

export default function Message(props: Props) {
  // 時間の形式を変更
  const time = DateTime.fromJSDate(new Date(props.time));

  return (
    <div className={`${styles.top} ${(props.mine) && styles.top_mine}`}>
      {
        /* ユーザー名と時刻 */
        function() {
          // 表示が無効のとき
          if (props.status == false) {
            return null;
          }
          // 表示が有効のとき
          return (
            <div
            className={`${styles.name} ${(props.mine) && styles.name_mine}`}
          >{props.user_name} [{time.toFormat("HH:mm")}]</div>
          )
        }()
      }
      {/* message box */}
      <div className={`
        ${styles.message_box}
        ${(props.mine)? styles.message_box_mine : styles.message_box_member}
      `}>
        {props.children}
      </div>
    </div>
  );
}