import { useContext } from 'react';

import styles from './header.css';

import { MainContext } from '../contexts';

type Props = {
  group_name: string,
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
    <div className={styles.group_name}>{props.group_name}</div>
    <button
      className={styles.member_button}
      onClick={props.toggleMemberList}
    >Member</button>
  </div>
  )
}
