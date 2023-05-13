import react from 'react'
import {DateTime} from 'luxon'

import styles from './message.module.css'

interface Props {
  user_name: string,
  mine: boolean,
  group_name: string,
  time: Date,
  children?: react.ReactNode
}

export default function Message(props: Props) { 
  // 時間の形式を変更
  const time = DateTime.fromJSDate(new Date(props.time));

  return (
    <div className={`${styles.top} ${(props.mine) && styles.mine_top}`}>
      {/* user name and time*/}
      <div
        className={`${styles.name} ${(props.mine) && styles.mine_name}`}
      >{props.user_name} [{time.toFormat("yyyy/MM/dd HH:mm")}] [{props.group_name}]</div>
      {/* message box */}
      <div className={`
        ${styles.message_box}
        ${(props.mine)? styles.mine_message_box : styles.member_message_box}
      `}>
        {props.children}
      </div>
    </div>
  );
}