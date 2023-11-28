import styles from './index.css';

interface Props {
  children?: React.ReactNode,
  display?: boolean,
  setHidden?: () => void,
}

export default function Popup(props: Props) {
  return (
    <div className={`
      ${styles.top}
      ${(!props.display) && styles.hidden}
    `}>
      <div
        className={styles.background}
        onClick={props.setHidden}
      />
      <div className={styles.popup}>
        {props.children}
      </div>
    </div>
  );
}
