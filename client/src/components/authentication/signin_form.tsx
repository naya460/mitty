import { useRouter } from 'next/router'
import { useRef } from 'react'

import CreatePostRequest from 'components/common/create_post_request'

import styles from './form.css'
import Textbox, { TextBoxRef } from 'components/common/textbox';
import Button from 'components/common/button';

export default function SingInForm() {
  const router = useRouter();
  const password_form = useRef<TextBoxRef>(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 送信するリクエストを作成
    const options = CreatePostRequest({
      user_name: event.target.user_name.value,
      password: event.target.password.value,
    });

    const response = await fetch(
      `http://${location.hostname}:9090/user/signin`,
      { ...options, credentials: 'include' }
    );
    
    if (response.ok) {
      router.reload();
    } else {
      alert('The user does not exist, or the password is incorrect.');
      password_form.current.clearText();
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
        ref={password_form}
        single={true}
        type='password'
        name='password'
        autoComplete='current-password'
        className={styles.form}
        styleOnDark={true}
        required={true}
      />
      {/* submit button */}
      <Button
        type='submit'
        accent={true}
        className={styles.button}
      >Sign In</Button>
    </form>
  )
}
