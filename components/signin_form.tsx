import { useRouter } from 'next/router'

import styles from './form.module.css'

export default function SingInForm() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 送信するデータを作成
    const data = {
      user_name: event.target.user_name.value,
      password: event.target.password.value,
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

    const response = await fetch('api/signin', options);

    const result = await response.text();
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.top}>
      <label className={styles.form_text}>User Name</label>
      <input type='text' name='user_name' className={styles.form} required/>
      <label className={styles.form_text}>Password</label>
      <input type='password' name='password' className={styles.form} required/>
      <button type='submit' className={styles.button}>Sign In</button>
    </form>
  )
}