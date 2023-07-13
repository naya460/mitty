import { useState } from 'react';
import styles from './group.module.css'
import useWebSocket from 'components/common/useWebSocket';

interface Props {
  onClick: () => void;
  group_name: string;
  group_id: string;
  selected_group_id: string;
}

export default function Group(props: Props) {
  const selected = props.group_id == props.selected_group_id;
  const [newMessageCount, setNewMessageCount] = useState(0);

  // メッセージを受信したとき、数を増やす
  useWebSocket((message) => {
    if (message.group_id != props.group_id) {
      return;
    }
    setNewMessageCount((prev) => prev + 1);
  });

  // ボタンを押したとき
  const onClick = () => {
    props.onClick();
    setNewMessageCount(() => 0);
  }
  
  return (
    <button
      className={`
        ${styles.top}
        ${selected && styles.top_selected}
      `}
      onClick={onClick}
    >
      <div>{props.group_name}</div>
      <div className={styles.count}>{
        (() => {
          if (newMessageCount != 0) {
            return newMessageCount;
          }
        })()
      }</div>
    </button>
  );
}