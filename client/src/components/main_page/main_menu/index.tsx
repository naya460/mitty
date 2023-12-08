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
