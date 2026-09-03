import React from 'react'
import LoginPage from './assets/components/LoginPage'
import SignupPage from './assets/components/SignupPage'
import {Route, Routes, useNavigate} from 'react-router-dom';

const App = () => {
  const navigate=useNavigate();

  return (
    <div className='appBody'>
      <Routes>
      <Route path="/" element={<LoginPage navigate={navigate}/>}/>
      <Route path="/sigup" element={<SignupPage navigate={navigate}/>}/>
    </Routes>
    </div>
  )
}

export default App
