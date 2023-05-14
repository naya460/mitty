import MessageList from './message_list'

import styles from './index.module.css'

interface Props {
  user_name: string
  selected_group_id: string
  selected_group_name: string
}

export default function GroupContents(props: Props) {
  return (
    <div className={styles.top}>
      <div className={styles.group_name}>{props.selected_group_name}</div>
      <MessageList
        user_name={props.user_name}
        selected_group_id={props.selected_group_id}
      />
    </div>
  )
}