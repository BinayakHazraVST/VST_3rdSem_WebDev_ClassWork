import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Dashboard = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Session expired. Please log in");
      navigate("/");
      return;
    }
  }, [token, navigate])

  if (!token) {
    return null;
  }

  return (
    <div className='layoutPage'>
      <div className="dashboardPage">

        <div className="logoBox">
          Order Tracker
        </div>

        <Navbar />

        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}>Log Out</button>

      </div>

      <div className='contentArea'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
