import React from 'react'
import SignUp from './assets/components/SignUp'
import Login from './assets/components/Login'
import { useState } from 'react'

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  return (
    <div>
      {
        isRegistered ? (<Login setIsRegistered={setIsRegistered}/>) : (<SignUp setIsRegistered={setIsRegistered}/>)
      }
    </div>
  )
}

export default App
