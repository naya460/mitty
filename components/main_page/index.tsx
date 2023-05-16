import { useState } from 'react'

import MainMenu from './main_menu'
import GroupContents from './group_contents'

import styles from './index.module.css'

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState(null);
  
  // 表示するグループを変更する関数
  const handleSetSelectedGroupData = (id: string, name: string) => {
    setSelectedGroupId(() => id);
    setSelectedGroupName(() => name);
  }

  return (
    <div className={styles.top}>
      <div className={styles.main_view}>
        <MainMenu
          user_name={props.user_name}
          setSelectedGroupData={handleSetSelectedGroupData}
          selected_group_id={selectedGroupId}
          selected_group_name={selectedGroupName}
        />
        <GroupContents
          user_name={props.user_name}
          selected_group_id={selectedGroupId}
          selected_group_name={selectedGroupName}
          clearSelectedGroup={() => handleSetSelectedGroupData(null, null)}
        />
      </div>
    </div>
  );
}