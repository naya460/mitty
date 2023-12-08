import React, { useContext, useState } from 'react';

import MessageInput from './message_input';

import styles from './index.css';
import MessageView from './message_view';
import { MainContext } from 'components/main_page/contexts';

export default function MessageList() {
  const [messageViews, setMessageViews] = useState(new Map<string, React.ReactElement>());
  const { user_name, group_id } = useContext(MainContext);
  
  if (messageViews.has(group_id) === false) {
    messageViews.set(
      group_id,
      (<MessageView user_name={user_name} selected_group_id={group_id} />)
    );
    setMessageViews(messageViews);
  }

  return (
    <div className={styles.top}>
      <div className={styles.group_list}>
        {Array.from(messageViews).map(value => {
          return (
            <div key={value[0]} className={`${(group_id !== value[0]) && styles.view_hidden}`}>
              {value[1]}
            </div>
          )
        })}
      </div>
      <MessageInput />
    </div>
  );
}
