import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
    let navigate=useNavigate();
    let [userData, setUserData]=useState({})
    let [message, setMessage]=useState("");

    const handleChange=(event)=>{
        let {name, value}=event.target;
        setUserData({...userData, [name]:value})
        if(message){
            setMessage("")
        }
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        let result=await axios.post("http://localhost:3000/signup", userData);

        setMessage(result.data.message);
        setUserData({})
    }
  return (
    <div className="formBox">
        <div className="header">
        <h1>Sign Up</h1>
        <span className="formDescription">Register yourself to proceed</span>
        </div>

      <form onSubmit={handleSubmit}> 
        <label>
            Name:<br/>
            <input type="text" placeholder='Enter your name' required
            name="name" value={userData?.name || ""} onChange={handleChange}/>
        </label>

         <label>
            Email:<br/>
            <input type="email" placeholder='Enter email' required
            name="email" value={userData?.email || ""} onChange={handleChange}/>
        </label>

         <label>
            Password:<br/>
            <input type="password" placeholder='Enter password' required
            name="password" value={userData?.password || ""} onChange={handleChange}/>
        </label>

         <label>
            Role:<br/>
            <select name="role" onChange={handleChange} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </label>

        <button>Sign Up</button>
      </form>
        {message? <p className="message">{message}</p>:<></>}
        <div onClick={()=>navigate("/")} className="switchPageBox">Already registered? Log In</div>
    </div>
  )
}

export default SignUpPage
