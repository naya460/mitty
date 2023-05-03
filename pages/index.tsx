import Link from 'next/link'

export default function IndexPage() {
  return (
    <form action='/api/login' method='post'>
      <label>User Name:</label><br />
      <input type='text' name='user_name' required/><br />
      <label>Password:</label><br />
      <input type='password' name='password'/><br />
      <button type='submit'>Submit</button>
    </form>
  )
}
