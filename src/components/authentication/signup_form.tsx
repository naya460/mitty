import { useRouter } from 'next/router'
import { useRef } from 'react'

import CreatePostRequest from 'components/common/create_post_request'

import styles from './form.css'

export default function SignUpForm() {
  const router = useRouter();
  const user_name_form = useRef<HTMLInputElement>(null);
  const password_form = useRef<HTMLInputElement>(null);
  const confirm_password_form = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 送信するデータを作成
    const options = CreatePostRequest({
      user_name: event.target.user_name.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value,
    });

    const response = await fetch('api/user/signup', options);
    const resJson = await response.json();

    if (resJson.success) {
      router.reload();
    } else {
      if (resJson.user) {
        user_name_form.current.value = '';
        password_form.current.value = '';
        confirm_password_form.current.value = '';
        alert('This user already exists.');
      } else if (!resJson.password) {
        password_form.current.value = '';
        confirm_password_form.current.value = '';
        alert('The passwords do not match.');
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
      {/* confirm password form */}
      <label className={styles.form_text}>Confirm Password</label>
      <input
        type='password'
        name='confirm_password'
        ref={confirm_password_form}
        className={styles.form}
        required
      />
      {/* submit button */}
      <button type='submit' className={styles.button}>Sign Up</button>
    </form>
  )
}