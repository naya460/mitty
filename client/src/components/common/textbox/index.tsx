import React, { useState, useRef, useImperativeHandle } from "react";

import styles from './index.css';

type Props = {
  name?: string,
  autoComplete?: string,
  required?: boolean,
  style?: React.CSSProperties,
  className?: string,
  maxViewLine?: number,
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>,
}

export type TextBoxRef = {
  text: string,
  clearText: () => void,
};

export default React.forwardRef(function TextBox(props: Props, ref: React.ForwardedRef<TextBoxRef>) {
  const [text, setText] = useState('');
  const [lineCount, setLineCount] = useState(1);

  // 変更を適応するハンドラ
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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
    <>
      <textarea
        name={props.name}
        autoComplete={props.autoComplete}
        required={props.required}
        onChange={handleChange}
        onKeyDown={props.onKeyDown}
        className={`${styles.text_area} ${props.className}`}
        style={{ ...props.style, height: `${lineCount * 1.5}rem` }}
        value={text}
      />
    </>
  );
});
