import styles from './index.css';

type Props = {
  children?: React.ReactNode,
  display?: boolean,
  setHidden?: () => void,
}

export default function Dialog(props: Props) {
  return (
    <>
      <div
        className={`${styles.background} ${(props.display)? styles.background_display : styles.hidden}`}
        onClick={props.setHidden}
      />
      <div className={`${styles.top} ${props.display || styles.hidden}`}>
        <div className={styles.dialog}>
          {props.children}
        </div>
      </div>
    </>
  );
}
