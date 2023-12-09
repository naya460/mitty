import { useState, useEffect } from 'react'

import AuthenticationPage from 'components/authentication'
import MainPage from 'components/main_page'
import { themeLight, themeDark } from 'components/common/global_vars.css';

export default function IndexPage() {
  const [json, setJson] = useState(null);
  const [page, setPage] = useState(<></>);
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    (async () => {
      // ユーザー情報を取得
      const user = await fetch(
        `http://${location.hostname}:9090/user/get_name`,
        { mode: 'cors', credentials: 'include' }
      );
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
          setPage(<MainPage user_name={tmp.display_name} />);
        }        
      }
    })();
  }, []);

  // ダークモードの判定
  useEffect(() => {
    // ダークモードのクエリを取得
    const dark_mode_query = window.matchMedia('(prefers-color-scheme: dark)');

    // モードを設定
    setDarkmode(dark_mode_query.matches);

    // リスナーを登録
    const listener = (event) => { setDarkmode(event.matches) };
    dark_mode_query.addEventListener('change', listener);

    // リスナーの解除を返却
    return () => {
      dark_mode_query.removeEventListener('change', listener);
    }
  }, []);

  return (
    <div style={{width: '100%', height: '100%'}} className={darkmode? themeDark: themeLight}>
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