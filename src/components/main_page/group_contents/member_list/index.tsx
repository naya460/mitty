import { useState, useEffect } from 'react'

import CreatePostRequest from 'components/common/create_post_request'

import styles from './index.css'

interface Props {
  display: boolean;
  toggleMessageList: () => void;
  selected_group_id: string;
}

export default function MemberList(props: Props) {
  const [members, setMembers] = useState(null);

  // メンバーを取得
  useEffect(() => {
    // グループが指定されていないとき、何もしない
    if (props.selected_group_id == null) return;

    (async () => {
      // 送信するリクエストを作成
      const options = CreatePostRequest({
        group_id: props.selected_group_id
      });

      // メンバーを取得
      const res = await fetch('api/group/member/get', options);
      const json = JSON.parse(await res.json());

      // メンバー名のリストを作成
      let list = [];
      for (let i in json) {
        list.push(json[i].user.user_name);
      }

      // メンバー一覧を更新
      setMembers(list);
    })()
  }, [props.selected_group_id]);

  // ユーザー追加処理
  const handleSubmit = async (event) => {
    event.preventDefault();

    // メンバーを追加
    const option = CreatePostRequest({
      group_id: props.selected_group_id,
      add_user_name: event.target.user_name.value
    });
    const res = await fetch('api/group/member/add', option);
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