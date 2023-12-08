import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MainMenu from './main_menu';
import GroupContents from './group_contents';
import { MainContext } from './contexts';

import styles from './index.css';
import { themeLight, themeDark } from 'components/common/global_vars.css';

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [darkmode, setDarkmode] = useState(false);

  // const dark_mode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  useEffect(() => {
    const dark_mode_query = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event) => { setDarkmode(event.matches) };
    dark_mode_query.addEventListener('change', listener);
    return () => {
      dark_mode_query.removeEventListener('change', listener);
    }
  }, [])
  
  // 表示するグループを変更する関数
  const handleSetSelectedGroupData = (id: string, name: string) => {
    setSelectedGroupId(() => id);
    setSelectedGroupName(() => name);
  }

  return (
    <div className={`${styles.top} ${darkmode? themeDark: themeLight}`}>
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
