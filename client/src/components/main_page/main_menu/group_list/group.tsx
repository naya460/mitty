// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './group.css';
import useWebSocket from 'components/common/useWebSocket';
import ListItem from 'components/common/list/list_item';

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
    <div className={styles.top}>
      <ListItem
        title={props.group_name}
        itemEnd={
          <div className={styles.count}>{
            (() => {
              if (newMessageCount != 0) {
                return newMessageCount;
              }
            })()
          }</div>
        }
        selected={props.is_selected}
        onClick={onClick}
      />
    </div>
  );
}
