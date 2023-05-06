import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

import SignInForm from '../components/signin_form'
import SignUpForm from '../components/signup_form'

import styles from './index.module.css'

export default function IndexPage() {
  const router = useRouter();
  const [json, setJson] = useState(null);
  const [page, setPage] = useState(<></>);
  // フォームの切り替え(1: signin, 2:signup)
  const [form, setForm] = useState(1);

  useEffect(() => {
    (async () => {
      const user = await fetch('/api/user');
      const tmp = await user.json();
      // サインインしていないときのページを設定
      if (tmp === null) {
        setPage(
          <>
            <div className={styles.top}>
              <p className={styles.title}>mitty</p>
              
              {Form()}
              {FormChangeButton()}
            </div>
          </>
        );
      }
      // サインインしているときのページを設定
      else {
        setPage(
          <>
            <p>User Name : {tmp.user_name}</p>
            <a href='/' onClick={handleSignOut}>Sign Out</a>
          </>
        );
      }
      // jsonが異なるとき更新
      if (json !== tmp) {
        setJson(tmp);
      }
    })();
  }, [form, json]);

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/signout');
    router.reload();
  }

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
    <>{page}</>
  )
}