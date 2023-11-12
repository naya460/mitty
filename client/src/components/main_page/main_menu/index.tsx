import { useRouter } from 'next/router'

import styles from './index.css'

import GroupList from './group_list'

interface Props {
  // main menu
  user_name: string;
  // group list
  setSelectedGroupData: (id: string, name: string) => void;
  selected_group_id: string;
}

export default function MainMenu(props: Props) {
  const router = useRouter();

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch(
      `http://${location.hostname}:9090/user/signout`,
      { mode: 'cors', credentials: 'include' }
    );
    router.reload();
  }

  return (
    <div className={`
      ${styles.top}
      ${(props.selected_group_id != null) && styles.top_selected}
    `}>
      <div className={styles.user_name}>User : {props.user_name}</div>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
      <GroupList
        setSelectedGroupData={props.setSelectedGroupData}
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}