import { MouseEventHandler } from "react";

import styles from './index.css'

type Props = {
  children?: React.ReactNode,
  type?: 'submit' | 'reset' | 'button',
  disabled?: boolean,
  accent?: boolean,
  className?: string,
  style?: React.CSSProperties,
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button(props: Props) {
  return (
    <div className={props.className} style={props.style}>
      <button
        type={props.type || 'button'}
        onClick={props.onClick}
        disabled={props.disabled}
        className={`${styles.button} ${(props.accent) && styles.accent}`}
      >{props.children}</button>
    </div>
  );
}
