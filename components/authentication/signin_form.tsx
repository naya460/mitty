import { useRouter } from 'next/router'
import { useRef } from 'react'

import styles from './form.module.css'

export default function SingInForm() {
  const router = useRouter();
  const user_name_form = useRef<HTMLInputElement>(null);
  const password_form = useRef<HTMLInputElement>(null);

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

    const response = await fetch('api/user/signin', options);
    const resJson = await response.json();

    if (resJson.success) {
      router.reload();
    } else {
      if (!resJson.user) {
        user_name_form.current.value = '';
        password_form.current.value = '';
        alert('The user does not exist.');
      } else if(!resJson.password) {
        password_form.current.value = '';
        alert('The password is incorrect.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.top}>
      {/* user name form */}
      <label className={styles.form_text}>User Name</label>
      <input
        type='text'
        name='user_name'
        ref={user_name_form}
        className={styles.form}
        required
      />
      {/* password form */}
      <label className={styles.form_text}>Password</label>
      <input
        type='password'
        name='password'
        ref={password_form}
        className={styles.form}
        required
      />
      {/* submit button */}
      <button type='submit' className={styles.button}>Sign In</button>
    </form>
  )
}