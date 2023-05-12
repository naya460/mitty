import { useRouter } from 'next/router'
import react, { useState } from 'react'

import styles from './message_input.module.css'
import { threadId } from 'worker_threads';

export default function MessageInput() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [lineCount, setLineCount] = useState(1);

  const handleSend = async (event) => {
    event.preventDefault();

    // 仮のグループを確認
    const check_group = await fetch('api/group/get');
    const check_group_json = await check_group.json();
    if (check_group_json.length == 0) {
      // 送信するデータを作成
      const data = {
        group_name: 'tmp'
      };

      const JSONdata = JSON.stringify(data);

      // 送信するリクエスト内容を作成
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };

      await fetch('api/group/create', options);
    }

    const group = await fetch('api/group/get');
    const groupJson = await group.json();
    console.log(groupJson);

    // 送信するデータを作成
    const data = {
      message: event.target.message.value,
      group_id: groupJson[0].group_id
    };

    const JSONdata = JSON.stringify(data);

    // 送信するリクエスト内容を作成
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    await fetch('api/message/send', options);
    router.reload();
  }

  const handleChange: react.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
    const length = event.target.value.split('\n').length;
    setLineCount(Math.min(length, 5));
  }

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
          required
        />
        <button type='submit' className={styles.send_button}>Send</button>
      </form>
    </div>
  );
}