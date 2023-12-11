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
