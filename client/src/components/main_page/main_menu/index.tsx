import styles from './index.css'

import GroupList from './group_list'
import UserCard from './user_card';

interface Props {
  // main menu
  user_name: string;
  // group list
  setSelectedGroupData: (id: string, name: string) => void;
  selected_group_id: string;
}

export default function MainMenu(props: Props) {
  return (
    <div className={`
      ${styles.top}
      ${(props.selected_group_id != null) && styles.top_selected}
    `}>
      <UserCard user_name={props.user_name} />
      <GroupList
        setSelectedGroupData={props.setSelectedGroupData}
        selected_group_id={props.selected_group_id}
      />
    </div>
  );
}
