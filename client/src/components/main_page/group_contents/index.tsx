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
