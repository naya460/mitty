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

import react from 'react'
import {DateTime} from 'luxon'

import styles from './message.css'

interface Props {
  display_name: string,
  mine: boolean,
  time: Date,
  status?: boolean,
  children?: react.ReactNode,
}

export default function Message(props: Props) {
  // 時間の形式を変更
  const time = DateTime.fromJSDate(new Date(props.time));

  return (
    <div className={`${styles.top} ${(props.mine) && styles.top_mine}`}>
      {
        /* ユーザー名と時刻 */
        function() {
          // 表示が無効のとき
          if (props.status == false) {
            return null;
          }
          // 表示が有効のとき
          return (
            <div className={`${styles.status} ${props.mine && styles.status_mine}`}>
              <div className={`${styles.name} ${props.mine && styles.name_mine}`}>{props.display_name}</div>
              <div className={styles.time}>{time.toFormat("HH:mm")}</div>
            </div>
          )
        }()
      }
      {/* message box */}
      <div className={`
        ${styles.message_box}
        ${(props.mine)? styles.message_box_mine : styles.message_box_member}
        ${(!props.status) &&
          ((props.mine)? styles.message_box_mine_related : styles.message_box_member_related)
        }
      `}>
        {props.children}
      </div>
    </div>
  );
}