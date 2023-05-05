import Link from 'next/link'

export default function IndexPage() {
  return (
    <>
      <Link href='./signin'>Sign In</Link><br/>
      <Link href='./signup'>Sign Up</Link>
    </>
  )
}