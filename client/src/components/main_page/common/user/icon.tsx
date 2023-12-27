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

import styles from "./icon.css";

import useWebSocket from "components/common/useWebSocket";
import mittyFetch from "utils/fetch";
import { mittyCache } from "utils/cache/cache";

type Props = {
  user_id: string,
};

export default function UserIcon(props: Props) {
  const [iconUrl, setIconUrl] = useState('');

  // アイコンの更新を反映
  useWebSocket((message) => {
    // データからURLを作成
    const buffer = Buffer.from(message.icon, "base64");
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);

    // アイコンをキャッシュ
    iconCache.updateData(message.user_id, url);
    
    // 一致するとき変更
    if (message.user_id === props.user_id) {
      setIconUrl(url);
    }
  }, "user/icon/set");

  // アイコンを取得
  useEffect(() => {
    (async () => {
      setIconUrl(await iconCache.getData(props.user_id));
    })();
  }, [props.user_id]);

  return (
    <img src={iconUrl} className={styles.icon} />
  );
}

// アイコンのキャッシュ処理
const iconCache = new mittyCache<string, string>({
  fetcher: async (id) => {
    if (id === null) return;
    
    // ユーザーのアイコンを取得
    const res = await mittyFetch({
      route: "user/get_icon",
      post_data: {
        user_id: id,
      }
    });

    const url = URL.createObjectURL(await res.blob());
    return url;
  }
});
