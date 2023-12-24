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

type Props = {
  user_id: string,
};

export default function UserProfile(props: Props) {
  return (
    <div className={styles.top}>
      <UserIcon user_id={props.user_id} />
      <UserName user_id={props.user_id} />
    </div>
  );
}
