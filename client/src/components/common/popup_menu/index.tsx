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

import ListItem from '../list/list_item';
import styles from './index.css';

interface Props {
  children?: React.ReactNode,
  list?: { text: string, onClick?: React.MouseEventHandler }[]
  display?: boolean,
  setHidden?: () => void,
}

export default function PopupMenu(props: Props) {
  return (
    <>
      <div
        className={`
          ${styles.top}
          ${(!props.display) && styles.top_hidden}
        `}
        onClick={props.setHidden}
      />
      <div className={styles.popup_base}>
        <div
          className={`
            ${styles.popup}
            ${(!props.display) && styles.popup_hidden}
          `}
        >
            {props.children}
            {
              props.list?.map(value => (
                <ListItem
                  key={value.text}
                  title={value.text}
                  onClick={value.onClick}
                ></ListItem>
              ))
            }
        </div>
      </div>
    </>
  );
}
