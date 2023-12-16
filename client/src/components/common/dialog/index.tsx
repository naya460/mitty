import styles from './index.css';

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
      <div className={`${styles.top} ${props.display || styles.hidden}`}>
        <div className={`${styles.dialog} ${props.display || styles.hidden}`}>
          <div className={styles.title}>{props.title}</div>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
}
