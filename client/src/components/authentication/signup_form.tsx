import { useRouter } from 'next/router'
import { useRef } from 'react'

import CreatePostRequest from 'components/common/create_post_request'

import styles from './form.css'

import Textbox from 'components/common/textbox';

export default function SignUpForm() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 送信するデータを作成
    const options = CreatePostRequest({
      user_name: event.target.user_name.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value,
    });

    const response = await fetch(
      `http://${location.hostname}:9090/user/signup`,
      { ...options, mode: 'cors', credentials: 'include' }
    );

    if (response.ok) {
      router.reload();
    } else {
      alert('The user already exists, or the passwords do not match.');
    }    
  }

  return (
    <form onSubmit={handleSubmit} className={styles.top}>
      {/* user name form */}
      <label className={styles.form_text}>User Name</label>
      <Textbox
        single={true}
        type='text'
        name='user_name'
        autoComplete='username'
        className={styles.form}
        styleOnDark={true}
        required={true}
      />
      {/* password form */}
      <label className={styles.form_text}>Password</label>
      <Textbox
        single={true}
        type='password'
        name='password'
        autoComplete='current-password'
        className={styles.form}
        styleOnDark={true}
        required={true}
      />
      {/* confirm password form */}
      <label className={styles.form_text}>Confirm Password</label>
      <Textbox
        single={true}
        type='password'
        name='confirm_password'
        autoComplete='new-password'
        className={styles.form}
        styleOnDark={true}
        required={true}
      />
      {/* submit button */}
      <button type='submit' className={styles.button}>Sign Up</button>
    </form>
  )
}
