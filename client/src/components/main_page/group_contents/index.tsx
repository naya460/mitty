import { useContext, useState } from 'react'

import MessageList from './message_list'
import MemberList from './member_list'

import styles from './index.css'
import { MainContext } from '../contexts';

export default function GroupContents() {
  const [displayMemberList, setMemberList] = useState(false);
  const { group_id, group_name, unset_group } = useContext(MainContext);

  return (
    <div className={`
      ${styles.top}
      ${(group_id === null) && styles.top_null}
    `}>
      <div className={styles.header}>
        <button
          className={styles.back_button}
          onClick={unset_group}
        >←</button>
        <div className={styles.group_name}>{group_name}</div>
        <button
          className={styles.member_button}
          onClick={() => setMemberList(!displayMemberList)}
        >Member</button>
      </div>
      <div className={styles.contents}>
        <MessageList />
        <MemberList
          display={displayMemberList}
          toggleMessageList={() => setMemberList(!displayMemberList)}
        />
      </div>
    </div>
  )
}
