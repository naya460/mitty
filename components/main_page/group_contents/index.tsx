import { useState } from 'react'

import MessageList from './message_list'
import MemberList from './member_list'

import styles from './index.css'

interface Props {
  user_name: string
  selected_group_id: string
  selected_group_name: string
  clearSelectedGroup: () => void;
}

export default function GroupContents(props: Props) {
  const [displayMemberList, setMemberList] = useState(false);

  return (
    <div className={`
      ${styles.top}
      ${(props.selected_group_id == null) && styles.top_null}
    `}>
      <div className={styles.header}>
        <button
          className={styles.back_button}
          onClick={props.clearSelectedGroup}
        >←</button>
        <div className={styles.group_name}>{props.selected_group_name}</div>
        <button
          className={styles.member_button}
          onClick={() => setMemberList(!displayMemberList)}
        >Member</button>
      </div>
      <div className={styles.contents}>
        <MessageList
          user_name={props.user_name}
          selected_group_id={props.selected_group_id}
        />
        <MemberList
          display={displayMemberList}
          toggleMessageList={() => setMemberList(!displayMemberList)}
          selected_group_id={props.selected_group_id}
        />
      </div>
    </div>
  )
}