import { useRouter } from 'next/router'

export default function SignUpForm() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 送信するデータを作成
    const data = {
      user_name: event.target.user_name.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value,
    };

    const JSONdata = JSON.stringify(data);

    // 送信するリクエスト内容を作成
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch('api/signup', options);

    const result = await response.text();
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>User Name:</label><br />
      <input type='text' name='user_name' required/><br />
      <label>Password:</label><br />
      <input type='password' name='password'/><br />
      <label>Confirm Password:</label><br />
      <input type='password' name='confirm_password'/><br />
      <button type='submit'>Sign Up</button>
    </form>
  )
}
