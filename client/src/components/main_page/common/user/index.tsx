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

import { useState, useEffect } from "react";

import styles from "./index.css";
import CreatePostRequest from "components/common/create_post_request";
import useWebSocket from "components/common/useWebSocket";

type Props = {
  user_id: string,
};

export default function User(props: Props) {
  const [userName, setUserName] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  useWebSocket((message) => {
    name_cache.set(message.user_id, message.display_name);
    if (message.user_id === props.user_id) {
      setUserName(message.display_name);
    }
  }, "user/rename");

  // 名前を取得
  useEffect(() => {
    (async () => {
      const namePromise = getDisplayName(props.user_id);
      const iconPromise = getIconUrl(props.user_id);
      const name = await namePromise;
      const icon = await iconPromise;
      setUserName(name);
      setIconUrl(icon);
    })();
  }, [props.user_id]);

  return (
    <div className={styles.top}>
      <img src={iconUrl} className={styles.icon} />
      <div className={styles.name}>{userName}</div>
    </div>
  );
}

// ユーザー名のキャッシュ処理
const name_cache = new Map<string, string>();

const getDisplayName = async (user_id: string): Promise<string> => {
  if (name_cache.has(user_id)) {
    return name_cache.get(user_id);
  } else {
    const options = CreatePostRequest({
      user_id: user_id,
    });

    // ユーザーの表示名を取得
    const res = await fetch(
      `http://${location.hostname}:9090/user/get_name`,
      { ...options, mode: 'cors', credentials: 'include' }
    );

    const display_name = (await res.json()).display_name;
    name_cache.set(user_id, display_name);
    return display_name;
  }
}

// アイコンのキャッシュ処理
const icon_cache = new Map<string, string>();

const getIconUrl = async (user_id: string): Promise<string> => {
  if (icon_cache.has(user_id)) {
    return icon_cache.get(user_id);
  } else {
    const options = CreatePostRequest({
      user_id: user_id,
    });

    // ユーザーのアイコンを取得
    const res = await fetch(
      `http://${location.hostname}:9090/user/get_icon`,
      { ...options, mode: 'cors', credentials: 'include' }
    );

    const url = URL.createObjectURL(await res.blob());
    icon_cache.set(user_id, url);
    return url;
  }
}
