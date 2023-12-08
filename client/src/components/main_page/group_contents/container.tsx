import { useContext, useState } from 'react';

import styles from './index.css';
import { MainContext } from '../contexts';

import MessageView from './message_list/message_view';
import MemberList from './member_list';
import MessageInput from './message_list/message_input';

type Props = {
  group_id: string,
  group_name: string,
  is_selected: boolean,
}

export default function GroupContentsContainer(props: Props) {
  const [displayMemberList, setMemberList] = useState(false);
  const { unset_group } = useContext(MainContext);

  return (
    <div className={`
      ${styles.top}
      ${(!props.is_selected) && styles.top_null}
    `}>
      <div className={styles.header}>
        <button
          className={styles.back_button}
          onClick={unset_group}
        >←</button>
        <div className={styles.group_name}>{props.group_name}</div>
        <button
          className={styles.member_button}
          onClick={() => setMemberList(!displayMemberList)}
        >Member</button>
      </div>
      <div className={styles.contents}>
        <MessageView group_id={props.group_id} />
        <MemberList
          display={displayMemberList}
          toggleMessageList={() => setMemberList(!displayMemberList)}
        />
      </div>
      <MessageInput />
    </div>
  )
}
