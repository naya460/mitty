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

import styles from './base.css';

type Props = {
  children?: React.ReactNode,
  display?: boolean,
  setHidden?: () => void,
  title?: string,
}

export default function Dialog(props: Props) {
  return (
    <>
      <div
        className={`${styles.background} ${(props.display)? styles.background_display : styles.hidden}`}
        onClick={props.setHidden}
      />
      <div className={styles.top}>
        <div className={`${styles.dialog} ${props.display || styles.hidden}`}>
          <div className={styles.title}>{props.title}</div>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
}
