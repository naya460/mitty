import react, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();
  const [messages, setMessages] = useState();
  const [displayMessages, setDisplayMessages] = useState(null);

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/user/signout');
    router.reload();
  }

  useEffect(() => {
    (async () => {
      // メッセージを取得する
      const res = await fetch('api/message/get');
      const msg = await res.json();
      setMessages(msg);
      // メッセージの表示を作成
      let display_msg = [];
      for (let i in msg) {
        display_msg.push(
          <p key={i} style={{whiteSpace: 'pre-line'}}>
            {msg[i].message_text}<br/>[{msg[i].author.user_name}]
          </p>
        );
      }
      setDisplayMessages(display_msg);
    })()
  }, [])

  return (
    <>
      <p>User Name : {props.user_name}</p>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
      <form method='POST' action='/api/message/send'>
        <textarea name='message' autoComplete='off' style={{resize: 'none'}} required/><br/>
        <button type='submit'>Send</button>
      </form>
      <div>{displayMessages}</div>
    </>
  );
}