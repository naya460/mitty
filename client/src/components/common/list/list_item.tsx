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

import styles from "./list_item.css";

type Props = {
  title: string,
  itemEnd?: React.ReactNode,
  selected?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function ListItem(props: Props) {
  return (
    <div className={styles.top}>
      <button
        className={`${styles.button} ${(props.selected) && styles.button_selected}`}
        onClick={props.onClick}
      >
        <div className={styles.title}>
          {props.title}
        </div>
        <div className={styles.itemEnd}>
          {props.itemEnd}
        </div>
      </button>
    </div>
  );
}
