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

import styles from './index.css'

import GroupList from './group_list'
import UserCard from './user_card';
import { MainContext } from '../contexts';

export default function MainMenu() {
  const { group_id } = useContext(MainContext);

  return (
    <div className={`
      ${styles.top}
      ${(group_id != null) && styles.top_selected}
    `}>
      <UserCard />
      <GroupList />
    </div>
  );
}
