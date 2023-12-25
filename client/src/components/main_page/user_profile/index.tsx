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

import styles from "./index.css";

import UserIcon from "../common/user/icon";
import UserName from "../common/user/name";
import { useEffect, useState } from "react";
import CreatePostRequest from "components/common/create_post_request";

type Props = {
  user_id: string,
};

export default function UserProfile(props: Props) {
  const [files, setFiles] = useState(new Map<string, string>);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://${location.hostname}:9090/user/get_file_list`,
        { mode: 'cors', credentials: 'include' }
      );
      const json = await res.json();
      json.forEach(async (value) => {
        const options = CreatePostRequest({
          file_id: value.file_id,
        });

        const res = await fetch(
          `http://${location.hostname}:9090/file/get`,
          { ...options, mode: 'cors', credentials: 'include' }
        );
        const url = URL.createObjectURL(await res.blob());

        files.set(value.file_id, url);
        setFiles(files);
      });
    })()
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.header}>
        <UserIcon user_id={props.user_id} />
        <UserName user_id={props.user_id} />
      </div>
      <div className={styles.image_list}>
        {Array.from(files).map(value => (
          <img src={value[1]} className={styles.image} />
        ))}
      </div>
    </div>
  );
}
