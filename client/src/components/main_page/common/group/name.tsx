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

import { useEffect, useState } from "react";
import mittyFetch from "utils/fetch";

import styles from "./name.css"
import { mittyCacheManager } from "utils/cache/manager";
import { addCacheManager } from "utils/cache";

type Props = {
  group_id: string,
};

export default function GroupName(props: Props) {
  const [groupName, setGroupName] = useState('');
  
  // 名前を取得
  useEffect(() => {
    (async () => {
      setGroupName(await nameCache.getData(props.group_id));
    })();
  }, [props.group_id]);

  return (
    <div className={styles.name}>{groupName}</div>
  );
}

// グループ名のキャッシュ処理
const nameCache = new mittyCacheManager<string, string>({
  initialize: async () => {
    // グループを取得
    const res = await mittyFetch({
      route: 'group/get',
    });
    const groups = await res.json();

    return groups.map(group => {
      return {id : group.group_id, data: group.group_name};
    });
  },
  fetcher: async (id) => {
    return null;
  }
});
addCacheManager('group_name', nameCache);
