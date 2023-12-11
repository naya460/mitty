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
