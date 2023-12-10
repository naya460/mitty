import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './group.css';
import useWebSocket from 'components/common/useWebSocket';

interface Props {
  group_name: string;
  group_id: string;
  is_selected: boolean;
}

export default function Group(props: Props) {
  const router = useRouter();
  const [newMessageCount, setNewMessageCount] = useState(0);
  
  // メッセージを受信したとき、数を増やす
  useWebSocket((message) => {
    // このボタンのグループではないとき、無視
    if (message.group_id != props.group_id) {
      return;
    }
    // 選択されているとき、無視
    if (props.is_selected) {
      return;
    }
    setNewMessageCount((prev) => prev + 1);
  });

  // ボタンを押したとき
  const onClick = () => {
    // router optionを作成
    const option = {
      pathname: '/',
      query: { group_id: props.group_id }
    };

    // グループを選択していないとき、ページを追加して移動
    if (router.query.group_id == null) {
      router.push(option);
    }
    // グループを選択しているとき、ページを置き換え
    else {
      router.replace(option);
    }

    // 未読メッセージ数を0にする
    setNewMessageCount(() => 0);
  }
  
  return (
    <button
      className={`
        ${styles.top}
        ${(props.is_selected)? styles.top_selected : styles.top_not_selected}
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
