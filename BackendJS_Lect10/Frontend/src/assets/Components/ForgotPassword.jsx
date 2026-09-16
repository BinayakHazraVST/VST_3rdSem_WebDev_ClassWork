import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail]=useState("");
    const [message, setMessage]=useState("");
    let navigate=useNavigate();

    const handleSubmit=async(event)=>{
        event.preventDefault();

        let result=await axios.post("http://localhost:3000/forgot-password", {email});
        setMessage(result.data.message);
        setEmail("");
    }

  return (
    <div className="formBox">
            <div className="header">
                <h1>Forgot Password</h1>
                <span className="formDescription">Verify youself</span>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Email:<br />
                    <input type="email" placeholder='Enter email' required
                        name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </label>

                <button>Reset Password</button>
            </form>
            {message ? <p className="message">{message}</p> : <></>}
            <div onClick={() => navigate("/")} className="switchPageBox"> Sign In Yourself</div>
        </div>
  )
}

export default ForgotPassword
