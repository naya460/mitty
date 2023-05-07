import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import AuthenticationPage from '../components/authentication_page'

export default function IndexPage() {
  const router = useRouter();
  const [json, setJson] = useState(null);
  const [page, setPage] = useState(<></>);

  useEffect(() => {
    (async () => {
      // ユーザー情報を取得
      const user = await fetch('/api/user');
      const tmp = await user.json();
      // サインインしていないときのページを設定
      if (tmp === null) {
        setPage(<AuthenticationPage />);
      }
      // jsonが異なるとき更新
      if (json !== tmp) {
        setJson(tmp);
        // サインインしているときのページを設定
        if (tmp !== null) {
          setPage(
            <>
              <p>User Name : {tmp.user_name}</p>
              <a href='/' onClick={handleSignOut}>Sign Out</a>
              <form method='POST' action='/api/send'>
                <textarea name='message' autoComplete='off' style={{resize: 'none'}} required/><br/>
                <button type='submit'>Send</button>
              </form>
            </>
          );
        }        
      }
    })();
  }, []);

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/signout');
    router.reload();
  }  

  return (
    <>{page}</>
  )
}