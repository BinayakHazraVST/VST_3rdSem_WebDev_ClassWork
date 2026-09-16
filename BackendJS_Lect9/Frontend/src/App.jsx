import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './assets/Components/LoginPage'
import SignUpPage from './assets/Components/SignUpPage'
import Dashboard from './assets/Components/Dashboard'
import Orders from './assets/Components/Orders'
import AddOrder from './assets/Components/AddOrder'
import Profile from './assets/Components/Profile'
import ChangeRole from './assets/Components/ChangeRole'
import UserChangeRole from './assets/Components/UserChangeRole'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route element={<Dashboard />}>
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/orders" element={<AddOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changeRole" element={<ChangeRole />} />
        <Route path="/user/:id" element={<UserChangeRole />} />
      </Route>
    </Routes>
  )
}

export default App
