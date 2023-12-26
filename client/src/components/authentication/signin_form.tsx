// Copyright 2023 naya460
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useRouter } from 'next/router'
import { useRef } from 'react'

import styles from './form.css'
import Textbox, { TextBoxRef } from 'components/common/textbox';
import Button from 'components/common/button';
import mittyFetch from 'utils/fetch';

export default function SingInForm() {
  const router = useRouter();
  const password_form = useRef<TextBoxRef>(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await mittyFetch({
      route: 'user/signin',
      post_data: {
        user_name: event.target.user_name.value,
        password: event.target.password.value,
      }
    });
    
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
