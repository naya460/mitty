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

import { useContext, useRef } from 'react';

import { MainContext } from '../contexts';
import GroupContentsContainer from './container';

export default function GroupContents() {
  const containers = useRef<{group_id: string, group_name: string}[]>([]);
  const { group_id, group_name } = useContext(MainContext);

  if (containers.current.some(value => { return value.group_id === group_id }) === false) {
    if (group_id !== null) {
      containers.current.push({group_id, group_name});
    }
  }

  return (
    <div style={{
      display: "flex",
      width: "100%",
      height: "100%"
    }}>{
      containers.current.map((container) => (
        <GroupContentsContainer
          key={container.group_id}
          group_id={container.group_id}
          group_name={container.group_name}
          is_selected={group_id === container.group_id}
        />
      ))
    }</div>
  );
}
