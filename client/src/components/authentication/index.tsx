import Link from 'next/link'
import { useState } from 'react'

import SignInForm from './signin_form'
import SignUpForm from './signup_form'

import styles from './index.css'

export default function AuthenticationPage() {
  // フォームの切り替え(1: signin, 2:signup)
  const [form, setForm] = useState(1);
  
    // フォーム
  const Form = () => {
    if (form == 1) {
      return (
        <>
          <div className={styles.description}>Sign In</div>
          <SignInForm />
        </>
      );
    } else if (form == 2) {
      return (
        <>
          <div className={styles.description}>Sign Up</div>
          <SignUpForm />
        </>
      );
    }
  }

  // フォーム切り替えボタン
  const FormChangeButton = () => {
    let text = '';
    let handleClick: () => void;
    if (form == 1) {
      text = 'Change to sign up page';
      handleClick = () => { setForm(2) };
    } else if (form == 2) {
      text = 'Change to sign in page';
      handleClick = () => { setForm(1) };
    }
    return (
      <Link
        href='/'
        onClick={handleClick}
        className={styles.change_a}
      >{text}</Link>
    );
  }

  return (
    <div className={styles.top}>
      <div className={styles.container}>
        <p className={styles.title}>mitty</p>
        {Form()}
        {FormChangeButton()}
      </div>
    </div>
  );
}
