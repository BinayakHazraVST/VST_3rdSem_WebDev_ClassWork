import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import LoginPage from './assets/components/LoginPage';
import SignupPage from './assets/components/SignupPage';
import AuthorizePage from './assets/components/AuthorizePage';

const App = () => {
  let navigate=useNavigate();
  return (
    <div className="mainApp">
      <Routes>
          <Route path="/" element={<LoginPage navigate={navigate}/>}/>
          <Route path="/signup" element={<SignupPage navigate={navigate}/>}/>
          <Route path="/authorize" element={<AuthorizePage navigate={navigate}/>}/>
      </Routes>
    </div>
  )
}

export default App
