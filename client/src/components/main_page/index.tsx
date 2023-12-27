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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MainMenu from './main_menu';
import GroupContents from './group_contents';
import { MainContext } from './contexts';

import styles from './index.css';
import UserProfile from './user_profile';

interface Props {
  user_id: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  
  // 表示するグループを変更する関数
  const handleSetSelectedGroupData = (id: string) => {
    if (id === null) {
      router.back();
      return;
    }

    const option = {
      pathname: '/',
      query: { group_id: id }
    };
    
    if (router.query.group_id == null) {
      router.push(option);
    }
    // グループを選択しているとき、ページを置き換え
    else {
      router.replace(option);
    }
  }

  // 表示するユーザープロフィールを変更する関数
  const handleSetSelectedUserProfile = (id: string) => {
    if (id === null) {
      router.back();
      return;
    }
    
    const option = {
      pathname: '/',
      query: { profile: id }
    };
    
    if (router.query.profile == null) {
      router.push(option);
    }
    // グループを選択しているとき、ページを置き換え
    else {
      router.replace(option);
    }
  }
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // クエリを解析
      const query = url.split('?')[1]?.split('&').map(data => {
        const [key, value] = data.split('=');
        return {key, value}
      });

      // 指定が無いとき
      if (query === undefined) {
        setSelectedGroupId(() => null);
        setSelectedUserProfile(() => null);
      }
      // グループの指定があるとき
      else if (query.find(value => value.key === 'group_id')) {
        setSelectedGroupId(() => query.find(value => value.key === 'group_id').value);
        setSelectedUserProfile(() => null);
      }
      // プロフィールの指定があるとき
      else if (query.find(value => value.key === 'profile')) {
        setSelectedGroupId(() => null);
        setSelectedUserProfile(() => query.find(value => value.key === 'profile').value)
      }
    }
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    }
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.main_view}>
        <MainContext.Provider value={{
          user_id: props.user_id,
          group_id: selectedGroupId,
          set_group: handleSetSelectedGroupData,
          unset_group: () => router.back(),
          set_user_profile: handleSetSelectedUserProfile,
        }}>
          <MainMenu />
          <div style={{
            display: `${(selectedGroupId)? 'flex' : 'none'}`,
            width: "100%",
            height: "100%"
          }}><GroupContents /></div>
          <div style={{
            display: `${(selectedUserProfile)? 'flex' : 'none'}`,
            width: "100%",
            height: "100%"
          }}><UserProfile user_id={selectedUserProfile} /></div>
        </MainContext.Provider>
      </div>
    </div>
  );
}
