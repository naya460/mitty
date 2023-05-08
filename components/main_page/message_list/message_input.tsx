import { useRouter } from 'next/router'

import styles from './message_input.module.css'

export default function MessageInput() {
  const router = useRouter();

  const handleSend = async (event) => {
    event.preventDefault();

    // 送信するデータを作成
    const data = {
      message: event.target.message.value
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

  return (
    <div className={styles.top}>
      <form onSubmit={handleSend} className={styles.form}>
        <textarea name='message' autoComplete='off' className={styles.message_box} rows={1} required/><br/>
        <button type='submit' className={styles.send_button}>Send</button>
      </form>
    </div>
  );
}