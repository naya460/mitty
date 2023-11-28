import styles from './index.css';

interface Props {
  children?: React.ReactNode,
  display?: boolean,
  setHidden?: () => void,
}

export default function PopupMenu(props: Props) {
  return (
    <>
      <div
        className={`
          ${styles.top}
          ${(!props.display) && styles.top_hidden}
        `}
        onClick={props.setHidden}
      />
      <div className={styles.popup_base}>
        <div
          className={`
            ${styles.popup}
            ${(!props.display) && styles.popup_hidden}
          `}
        >
            {props.children}
        </div>
      </div>
    </>
  );
}
