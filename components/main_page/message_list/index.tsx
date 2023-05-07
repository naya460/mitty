import { useState, useEffect } from 'react'

export default function MessageList() {
  const [displayMessages, setDisplayMessages] = useState(null);

  useEffect(() => {
    (async () => {
      // メッセージを取得する
      const res = await fetch('api/message/get');
      const messages = await res.json();
      // メッセージの表示を作成
      let display_msg = [];
      for (let i in messages) {
        display_msg.push(
          <p key={i} style={{whiteSpace: 'pre-line'}}>
            {messages[i].message_text}<br/>[{messages[i].author.user_name}]
          </p>
        );
      }
      setDisplayMessages(display_msg);
    })()
    }, [])

    return <>{displayMessages}</>
}