import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const LoginPage = () => {
    const [userData, setUserData] = useState({})
    const [message, setMessage]=useState("");

    let navigate=useNavigate();

    const handleChange=(event)=>{
        let {name, value}=event.target;

        setUserData({...userData, [name]:value});
        setMessage("");
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        let result=await axios.post("http://localhost:3000/login", userData);
        
        let token=result.data.token;
        
        setUserData({})
        setMessage(result.data.message);

        if(token){
            localStorage.setItem("token",token);
            navigate("/dashboard")
        }
    }

  return (
    <div>
      <h1>Welcome Back</h1>
      <span>Login to your account</span>
      <form onSubmit={handleSubmit}>
        <label>
            Email:
            <input type="email" placeholder='Enter email' name="email" required
            value={userData?.email || ""} onChange={handleChange}/>
        </label><br/>

        <label>
            Password:
            <input type="password" placeholder='Enter password' name="password" required
            value={userData?.password || ""} onChange={handleChange}/>
        </label><br/>

        <button>Log In</button>
      </form>

      {message? <p>{message}</p>: <></>}
      <div onClick={()=>navigate("/signup")}>Not registered? Sign up</div>
    </div>
  )
}

export default LoginPage
