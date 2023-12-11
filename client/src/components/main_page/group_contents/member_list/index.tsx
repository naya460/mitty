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

import { useState, useEffect, useContext } from 'react'

import CreatePostRequest from 'components/common/create_post_request'

import styles from './index.css'
import { MainContext } from 'components/main_page/contexts';

interface Props {
  display: boolean;
  toggleMessageList: () => void;
}

export default function MemberList(props: Props) {
  const [members, setMembers] = useState(null);
  const { group_id } = useContext(MainContext);

  // メンバーを取得
  useEffect(() => {
    // グループが指定されていないとき、何もしない
    if (group_id == null) return;

    (async () => {
      // 送信するリクエストを作成
      const options = CreatePostRequest({
        group_id: group_id
      });

      // メンバーを取得
      const res = await fetch(
        `http://${location.hostname}:9090/group/member/get`,
        { ...options, mode: 'cors', credentials: 'include' }
      );
      const json = await res.json();

      // メンバー名のリストを作成
      let list = [];
      for (let i in json) {
        list.push(json[i].user.display_name);
      }

      // メンバー一覧を更新
      setMembers(list);
    })()
  }, [group_id]);

  // ユーザー追加処理
  const handleSubmit = async (event) => {
    event.preventDefault();

    // メンバーを追加
    const option = CreatePostRequest({
      group_id: group_id,
      add_user_name: event.target.user_name.value
    });
    const res = await fetch(
      `http://${location.hostname}:9090/group/member/add`,
      { ...option, mode: 'cors', credentials: 'include' }
    );
    const message = await res.text();
  }

  return (
    <>
      <div
        className={`
          ${styles.background}
          ${(props.display) && styles.bg_display}
        `}
        onClick={props.toggleMessageList}
      />
      <div className={`
        ${styles.top}
        ${(props.display) && styles.top_display}
      `}>
        <div className={styles.title_text}>Group Member</div>
        {
          function() {
            let list = [];
            for (let i in members) {
              list.push(
                <div key={i}>{members[i]}</div>
              );
            }
            return <>{list}</>
          }()
        }
        <form onSubmit={handleSubmit}>
          <input type='text' name='user_name'/><br/>
          <button type='submit'>Add Member</button>
        </form>
      </div>
    </>
  );
}
