import { useState } from 'react'
import { SigninForm } from '../components/SigninForm'
import { SignupForm } from '../components/SignupForm'

export default function Home() {
  const [signUp, setSignUp] = useState<boolean>(false)

  return (
    <div className="w-screen h-fit">
      <h1>Hello!</h1>
      <button type="button" onClick={() => setSignUp(!signUp)}>{signUp ? "Already have an account?" : "Not signed up yet?"}</button>
      <section className='h-80 w-80 bg-gray-500'>
        {signUp ?
        <SignupForm  />
        :
        <SigninForm nextPage="/client" />}
      </section>
    </div>
  )
}