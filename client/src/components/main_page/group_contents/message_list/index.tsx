import React, { useState, useRef, RefObject, createRef, useEffect } from 'react'
import { DateTime } from 'luxon'

import Message from './message'
import MessageInput from './message_input'
import useElementList, { MessageElement, DateElement, Element } from './element_list'

import styles from './index.css'
import MessageView from './message_view'

interface Props {
  user_name: string,
  selected_group_id: string
}

export default function MessageList(props: Props) {
  const [messageViews, setMessageViews] = useState(new Map<string, React.ReactElement>());
  
  if (messageViews.has(props.selected_group_id) === false) {
    messageViews.set(
      props.selected_group_id,
      (<MessageView user_name={props.user_name} selected_group_id={props.selected_group_id} />)
    );
    setMessageViews(messageViews);
  }

  return (
    <div className={styles.top}>
      <div className={styles.group_list}>
        {Array.from(messageViews).map(value => {
          return (
            <div key={value[0]} className={`${(props.selected_group_id !== value[0]) && styles.message_list_hidden}`}>
              {value[1]}
            </div>
          )
        })}
      </div>
      
      <MessageInput
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}