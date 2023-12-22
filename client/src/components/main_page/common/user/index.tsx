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

type Props = {
  user_id: string,
  icon_url: string,
};

export default function User(props: Props) {
  const [userName, setUserName] = useState('');

  // 名前を取得
  useEffect(() => {
    (async () => {
      const options = CreatePostRequest({
        user_id: props.user_id,
      });

      // ユーザーの表示名を取得
      const res = await fetch(
        `http://${location.hostname}:9090/user/get_name`,
        { ...options, mode: 'cors', credentials: 'include' }
      );
      setUserName((await res.json()).display_name);
    })();
  }, []);

  return (
    <div className={styles.top}>
      <img src={props.icon_url} className={styles.icon} />
      <div className={styles.name}>{userName}</div>
    </div>
  );
}
