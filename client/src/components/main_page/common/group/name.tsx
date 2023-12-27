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

type Props = {
  group_id: string,
};

export default function GroupName(props: Props) {
  const [groupName, setGroupName] = useState('');
  
  // 名前を取得
  useEffect(() => {
    (async () => {
      const name = await getGroupName(props.group_id);
      setGroupName(name);
    })();
  }, [props.group_id]);

  return (
    <div className={styles.name}>{groupName}</div>
  );
}

export const getGroupList = () => {
  getGroupName(null);
  return Array.from(name_cache).map(value => {
    return { group_id: value[0], group_name: value[1] };
  });
}

// グループ名のキャッシュ処理
const name_cache = new Map<string, string>();

const getGroupName = async (group_id: string): Promise<string> => {
  if (name_cache.has(group_id)) {
    return name_cache.get(group_id);
  } else {
    // グループを取得
    const res = await mittyFetch({
      route: 'group/get',
    });
    const groups = await res.json();

    groups.forEach(group => {
      name_cache.set(group.group_id, group.group_name);
    });
    return name_cache.get(group_id);
  }
}
