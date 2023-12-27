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

import { useContext } from 'react';

import styles from './header.css';

import { MainContext } from '../contexts';
import Button from 'components/common/button';
import GroupName from '../common/group/name';

type Props = {
  group_id: string,
  toggleMemberList: () => void,
}

export default function GroupContentsHeader(props: Props) {
  const { unset_group } = useContext(MainContext);

  return (
  <div className={styles.header}>
    <button
      className={styles.back_button}
      onClick={unset_group}
    >←</button>
    <GroupName group_id={props.group_id} />
    <Button
      onClick={props.toggleMemberList}
    >Member</Button>
  </div>
  );
}
