import react, { useContext, useRef } from 'react';

import useWebSocket from 'components/common/useWebSocket';

import styles from './message_input.css';
import { MainContext } from 'components/main_page/contexts';
import TextBox, { TextBoxRef } from 'components/common/textbox';

export default function MessageInput() {
  const [socketSend] = useWebSocket();
  const textbox_ref = useRef<TextBoxRef>();

  const { group_id } = useContext(MainContext);

  const sendMessage = () => {
    const text = textbox_ref.current.text;

    // 送信するリクエストを作成
    const message = {
      route: 'message/send',
      message: text,
      group_id: group_id
    };

    // メッセージを送信
    socketSend(message);

    // 入力欄を初期化
    textbox_ref.current.clearText();
  }

  const handleSend = async (event) => {
    event.preventDefault();

    // メッセージを送信
    sendMessage();

    // TextBoxをリセット
    textbox_ref.current.clearText();
  };

  const handleKeyDown: react.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.ctrlKey || event.shiftKey || event.altKey) {
      if (event.key == "Enter") {
        sendMessage();
      }
    }
  }

  const disabled = group_id == null;

  return (
    <div className={styles.top}>
      <form onSubmit={handleSend} className={styles.form}>
        <TextBox
          name='message'
          autoComplete='off'
          className={styles.message_box}
          maxViewLine={5}
          onKeyDown={handleKeyDown}
          required={true}
          ref={textbox_ref}
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
