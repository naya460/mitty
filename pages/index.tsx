import Link from 'next/link'
import { useState } from 'react'

import SignInForm from '../components/signin_form'
import SignUpForm from '../components/signup_form'

export default function IndexPage() {
  // フォームの切り替え(1: signin, 2:signup)
  const [form, setForm] = useState(1);

  // フォーム
  const Form = () => {
    if (form == 1) {
      return <SignInForm />;
    } else if (form == 2) {
      return <SignUpForm />;
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
    return <button onClick={handleClick}>{text}</button>;
  }

  return (
    <>
      {Form()}
      {FormChangeButton()}<br/>
      <Link href='./api/signout'>Sign Out</Link>
    </>
  )
}