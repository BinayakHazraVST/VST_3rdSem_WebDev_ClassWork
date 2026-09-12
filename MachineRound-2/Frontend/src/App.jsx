import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginPage from './assets/components/LoginPage';
import SignUpPage from './assets/components/SignUpPage';
import Dashboard from './assets/components/Dashboard';
import ChangeRole from './assets/components/ChangeRole';
import ChangeName from './assets/components/ChangeName';
import AllUserDetails from './assets/components/AllUserDetails';
import OrdersPage from './assets/components/OrdersPage';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/changeName" element={<ChangeName/>}/>
      <Route path="/changeRole" element={<AllUserDetails/>}/>
      <Route path="/user/:id" element={<ChangeRole/>}/>
      <Route path="/orders/:id" element={<OrdersPage/>}/>
    </Routes>
  )
}

export default App
