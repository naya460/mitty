import Link from 'next/link'

export default function IndexPage() {
  return (
    <form>
      <label>User Name:</label><br />
      <input type='text'/><br />
      <label>Password:</label><br />
      <input type='password' /><br />
      <button>Submit</button>
    </form>
  )
}
