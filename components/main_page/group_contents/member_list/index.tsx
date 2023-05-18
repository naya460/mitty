import { useRouter } from 'next/router'

import CreatePostRequest from 'components/common/create_post_request'

import styles from './index.module.css'

interface Props {
  members: String[];
  toggleMessageList: () => void;
  selected_group_id: string;
}

export default function MemberList(props: Props) {
  const router = useRouter();

  // ユーザー追加処理
  const handleSubmit = async (event) => {
    event.preventDefault();

    // メンバーを追加
    const option = CreatePostRequest({
      group_id: props.selected_group_id,
      add_user_name: event.target.user_name.value
    });
    const res = await fetch('api/group/add_member', option);
    const message = await res.text();
    alert(message);
    if (res.status != 200) return;

    router.reload();
  }

  return (
    <>
      <div
        className={styles.background}
        onClick={props.toggleMessageList}
      />
      <div className={styles.top}>
        <div className={styles.title_text}>Group Member</div>
        {
          function() {
            let list = [];
            for (let i in props.members) {
              list.push(
                <div key={i}>{props.members[i]}</div>
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