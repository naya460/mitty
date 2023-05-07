import { useState, useEffect } from 'react'

import Message from './message'

interface Props {
  user_name: string
}

export default function MessageList(props: Props) {
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
          <Message
            key={i}
            user_name={messages[i].author.user_name}
            mine={props.user_name == messages[i].author.user_name}
          >
            {messages[i].message_text}
          </Message>
        );
      }
      setDisplayMessages(display_msg);
    })()
    }, [])

    return <div style={{position: 'relative'}}>{displayMessages}</div>;
}