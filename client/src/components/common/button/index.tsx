// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

type LabelButtonProps = {
  children?: React.ReactNode,
  for: string,
};

export const LabelButton = (props: LabelButtonProps) => {
  return (
    <label
      htmlFor={props.for}
      className={`${styles.button} ${styles.label_button}`}
    >
      {props.children}
    </label>
  );
}
