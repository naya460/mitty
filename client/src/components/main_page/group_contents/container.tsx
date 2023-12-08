import { useState } from 'react';

import styles from './container.css';

import MessageView from './message_view';
import MemberList from './member_list';
import MessageInput from './message_input';
import GroupContentsHeader from './header';

type Props = {
  group_id: string,
  group_name: string,
  is_selected: boolean,
}

export default function GroupContentsContainer(props: Props) {
  const [displayMemberList, setMemberList] = useState(false);

  return (
    <div className={`
      ${styles.top}
      ${(!props.is_selected) && styles.top_null}
    `}>
      <GroupContentsHeader
        group_name={props.group_name}
        toggleMemberList={() => setMemberList(!displayMemberList)}
      />
      <div className={styles.side}>
        <div className={styles.contents}>
          <MessageView group_id={props.group_id} />
          <MessageInput />
        </div>
        <MemberList
          display={displayMemberList}
          toggleMessageList={() => setMemberList(!displayMemberList)}
        />
      </div>
    </div>
  )
}
