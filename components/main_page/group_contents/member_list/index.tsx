import styles from './index.module.css'

interface Props {
  members: String[];
  toggleMessageList: () => void;
}

export default function MemberList(props: Props) {
  return (
    <>
      <div
        className={styles.background}
        onClick={props.toggleMessageList}
      />
      <div className={styles.top}>
        <div className={styles.title_text}>Group Member</div>
        {
          function() {
            let list = [];
            for (let i in props.members) {
              list.push(
                <div key={i}>{props.members[i]}</div>
              );
            }
            return <>{list}</>
          }()
        }
      </div>
    </>
  );
}