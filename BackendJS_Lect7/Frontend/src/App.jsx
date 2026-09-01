import React from 'react'
import { useState } from 'react'
import LoginPage from './assets/components/LoginPage'
import SignupPage from './assets/components/SignupPage'

const App = () => {
  const [isRegistered, setIsRegistered] = useState(true)
  return (
    <div className='appBody'>
      {
        isRegistered ? <LoginPage setIsRegistered={setIsRegistered} /> :
          <SignupPage setIsRegistered={setIsRegistered} />
      }
    </div>
  )
}

export default App
