import { useState } from 'react';
import { useRouter } from 'next/router';

import MainMenu from './main_menu';
import GroupContents from './group_contents';
import { MainContext } from './contexts';

import styles from './index.css';

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();
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
        <MainContext.Provider value={{
          user_name: props.user_name,
          group_id: selectedGroupId,
          group_name: selectedGroupName,
          set_group: handleSetSelectedGroupData,
          unset_group: () => router.back(),
        }}>
          <MainMenu />
          <GroupContents />
        </MainContext.Provider>
      </div>
    </div>
  );
}
