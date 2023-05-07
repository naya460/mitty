import { useRouter } from 'next/router'

import MessageList from './message_list'

interface Props {
  user_name: string;
}

export default function MainPage(props: Props) {
  const router = useRouter();

  // サインアウト処理
  const handleSignOut = async () => {
    await fetch('/api/user/signout');
    router.reload();
  }

  return (
    <>
      <p>User Name : {props.user_name}</p>
      <a href='/' onClick={handleSignOut}>Sign Out</a>
      <form method='POST' action='/api/message/send'>
        <textarea name='message' autoComplete='off' style={{resize: 'none'}} required/><br/>
        <button type='submit'>Send</button>
      </form>
      <MessageList />
    </>
  );
}