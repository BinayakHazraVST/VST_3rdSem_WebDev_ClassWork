import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let token=localStorage.getItem("token");
  let navigate=useNavigate();

  useEffect(()=>{
      if(!token){
        alert("Session expired. Please log in");
        navigate("/");
        return;
      }
    }, [token, navigate])
  
    if(!token){
      return null;
    }
    
  return (
    <div className='navbarContainer'>
      <Link to="/profile" className='link'>My Profile</Link>
      <Link to="/my-orders" className='link'>My Orders</Link>
      <Link to="/orders" className='link'>Add Order</Link>
      <Link to="/changeRole" className='link'>Change Role</Link>
    </div>
  )
}

export default Navbar
