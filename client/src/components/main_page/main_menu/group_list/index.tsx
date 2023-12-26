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

import { useState, useEffect, useContext } from 'react';
import styles from './index.css'

import Group from './group'
import useWebSocket from 'components/common/useWebSocket';
import { MainContext } from 'components/main_page/contexts';
import CreateGroupButton from './create';
import mittyFetch from 'utils/fetch';

export default function GroupList() {
  const [groupList, setGroupList] = useState<{ id: string, name: string}[]>(null);
  const { group_id, set_group } = useContext(MainContext);

  useWebSocket(
    (message) => {
      setGroupList([ ...groupList, { id: message.group_id, name: message.group_name }]);
    }, 'group/create'
  );

  // クエリが更新されたとき表示を変更
  useEffect(() => {
    // グループが存在しないとき、何もしない
    if (groupList == null) return;

    // 表示を更新
    set_group(
      group_id,
      groupList.find(list => list.id === group_id)?.name
    );
  }, [group_id]);

  // 最初にグループの一覧を読み込む
  useEffect(() => {
    (async () => {
      // グループを取得
      const res = await mittyFetch({
        route: 'group/get',
      });
      const groups = await res.json();

      // グループの表示を作成
      let group_list = [];
      for (let i in groups) {
        // グループの一覧に追加
        group_list.push({
          id: groups[i].group_id,
          name: groups[i].group_name,
          members: function(){
            let list = [];
            for (let j in groups[i].members) {
              list.push(groups[i].members[j].user.user_name);
            }
            return list;
          }()
        });
      }
      setGroupList(group_list);
    })()
  }, []);

  return (
    <div className={styles.top}>
      <CreateGroupButton />
      {groupList?.map((data) => {
        return (
          <Group
            group_name={data.name}
            group_id={data.id}
            is_selected={data.id === group_id}
            key={data.id}
          />
        )
      })}
    </div>
  );
}
