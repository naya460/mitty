import react, { useState } from 'react'

import useWebSocket from 'components/common/useWebSocket';

import styles from './message_input.css'

interface Props {
  selected_group_id: string;
}

export default function MessageInput(props: Props) {
  const [text, setText] = useState('');
  const [lineCount, setLineCount] = useState(1);

  const [socketSend] = useWebSocket();

  const sendMessage = () => {
    // 送信するリクエストを作成
    const message = {
      message: text,
      group_id: props.selected_group_id
    };

    // メッセージを送信
    socketSend(message);

    // 入力欄をリセット
    setLineCount(1);
    setText('');
  }

  const handleSend = async (event) => {
    event.preventDefault();

    // メッセージを送信
    sendMessage();
  }

  const handleChange: react.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    // 文字列を更新
    setText(event.target.value);
    // 表示行数を設定
    const length = event.target.value.split('\n').length;
    setLineCount(Math.min(length, 5));
  }

  const handleKeyDown: react.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.ctrlKey || event.shiftKey || event.altKey) {
      if (event.key == "Enter") {
        sendMessage();
      }
    }
  }

  const disabled = props.selected_group_id == null;

  return (
    <div className={styles.top}>
      <form onSubmit={handleSend} className={styles.form}>
        <textarea
          name='message'
          autoComplete='off'
          className={styles.message_box}
          style={{height: `${lineCount * 1.5}rem`}}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          required
        />
        <button
          type='submit'
          className={styles.send_button}
          disabled={disabled}
        >Send</button>
      </form>
    </div>
  );
}