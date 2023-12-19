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

import { useEffect, useState, useContext } from "react";
import { MainContext } from "components/main_page/contexts";

import styles from "./index.css";

export default function User() {
  const [imageUrl, setImageUrl] = useState('');
  const { user_name } = useContext(MainContext);

  // アイコンの読み込み
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://${location.hostname}:9090/user/get_icon`,
        { mode: 'cors', credentials: 'include' }
      );
      const url = URL.createObjectURL(await res.blob());
      setImageUrl(url);
    })();
  }, []);

  return (
    <div className={styles.top}>
      <img src={imageUrl} className={styles.icon} />
      <div className={styles.name}>{user_name}</div>
    </div>
  );
}
