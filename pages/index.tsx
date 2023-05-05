import Link from 'next/link'

export default function IndexPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      user_name: event.target.user_name.value,
      password: event.target.password.value,
    };

    const JSONdata = JSON.stringify(data);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch('api/login', options);

    const result = await response.json();
    console.log(result.data)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>User Name:</label><br />
      <input type='text' name='user_name' required/><br />
      <label>Password:</label><br />
      <input type='password' name='password'/><br />
      <button type='submit'>Submit</button>
    </form>
  )
}
