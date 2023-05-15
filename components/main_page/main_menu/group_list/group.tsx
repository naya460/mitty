import styles from './group.module.css'

interface Props {
  onClick: () => void;
  group_name: string;
  group_id: string;
  selected_group_id: string;
}

export default function Group(props: Props) {
  const selected = props.group_id == props.selected_group_id;
  
  return (
    <button
      className={`
        ${styles.top}
        ${selected && styles.top_selected}
      `}
      onClick={props.onClick}
    >{props.group_name}</button>
  );
}