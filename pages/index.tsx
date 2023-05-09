import { useState, useEffect } from 'react'

import AuthenticationPage from 'components/authentication'
import MainPage from 'components/main_page'

export default function IndexPage() {
  const [json, setJson] = useState(null);
  const [page, setPage] = useState(<></>);

  useEffect(() => {
    (async () => {
      // ユーザー情報を取得
      const user = await fetch('/api/user/user');
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
          setPage(<MainPage user_name={tmp.user_name} />);
        }        
      }
    })();
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}}>
      <div style={{width: '100%', height: '100%'}}>{page}</div>
      <style global jsx>{`
        html,
        body,
        div#__next,
        div#__next > div {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      `}</style>
    </div>
  )
}