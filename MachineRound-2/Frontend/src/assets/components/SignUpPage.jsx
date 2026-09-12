import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUpPage = () => {
    const [userData, setUserData] = useState({})
    const [message, setMessage]=useState("")

    let navigate=useNavigate();

    const handleChange=(event)=>{
        let {name, value}=event.target;
        setUserData({...userData, [name]:value})

        setMessage("");
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        let result=await axios.post("http://localhost:3000/signup", userData);

        setMessage(result.data.message);
        setUserData
    }

  return (
    <div>
      <h1>Create Your Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" placeholder='Enter you name' required
            name="name"
            value={userData?.name || ""} onChange={handleChange}/>
        </label><br/>

        <label>
            Email:
            <input type="email" placeholder='Enter email' required
            name="email"
            value={userData?.email || ""} onChange={handleChange}/>
        </label><br/>

        <label>
            Password:
            <input type="password" placeholder='Enter password' required 
            name="password"
            value={userData?.password || ""} onChange={handleChange}/>
        </label><br/>

        <label>
            Role:
            <select onChange={handleChange} required name="role">
                <option value="">Select your role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </label><br/>

        <button>Sign Up</button>
      </form>

      {message? <p>{message}</p>:<></>}
      <div onClick={()=>navigate("/")}>Already registered? Log in </div>
    </div>
  )
}

export default SignUpPage
