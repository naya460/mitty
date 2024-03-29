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

import React, { useState, useRef, useImperativeHandle } from "react";

import styles from './index.css';

type Props = {
  single?: boolean,
  type?: 'text' | 'password', // single === true のみ
  name?: string,
  autoComplete?: string,
  required?: boolean,
  style?: React.CSSProperties,
  className?: string,
  maxViewLine?: number,
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement | HTMLInputElement>,
  styleOnDark?: boolean,
}

export type TextBoxRef = {
  text: string,
  clearText: () => void,
};

export default React.forwardRef(function TextBox(props: Props, ref: React.ForwardedRef<TextBoxRef>) {
  const [text, setText] = useState('');
  const [lineCount, setLineCount] = useState(1);

  // 変更を適応するハンドラ
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    // 文字列を更新
    setText(event.target.value);

    // 表示行数を設定
    const length = event.target.value.split('\n').length;
    setLineCount(Math.min(length, props.maxViewLine));
  }

  // 親に独自のrefを渡す
  useImperativeHandle(ref, () => {
    return {
      text: text,
      clearText: () => {
        setText('');
        setLineCount(1);
      },
    };
  }, [text]);

  return (
    <div
      className={`${props.className} ${styles.top}`}
      style={props.style}
    >{
      (() => {
        if (props.single) {
          return (
            <input
              type={props.type || 'text'}
              name={props.name}
              autoComplete={props.autoComplete}
              required={props.required}
              onChange={handleChange}
              onKeyDown={props.onKeyDown}
              className={`${styles.textbox} ${(props.styleOnDark)? styles.onDark : null } ${styles.single}`}
              style={{ height: `${lineCount * 1.2}rem` }}
              value={text}
            />
          )
        } else {
          return (
            <textarea
              name={props.name}
              autoComplete={props.autoComplete}
              required={props.required}
              onChange={handleChange}
              onKeyDown={props.onKeyDown}
              className={`${styles.textbox} ${(props.styleOnDark)? styles.onDark : null }`}
              style={{ height: `${lineCount * 1.5}rem` }}
              value={text}
            />
          );
        }
      })()
    }</div>
  );
});
