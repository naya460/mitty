import react from 'react'

import styles from './message.module.css'

interface Props {
  user_name: string,
  mine: boolean,
  children?: react.ReactNode
}

export default function Message(props: Props) {
  return (
    <div className={`${styles.top} ${(props.mine) && styles.mine_top}`}>
      {/* user name */}
      <div
        className={`${styles.name} ${(props.mine) && styles.mine_name}`}
      >{props.user_name}</div>
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