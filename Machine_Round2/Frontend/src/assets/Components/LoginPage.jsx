import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    let navigate = useNavigate();
    let [userData, setUserData] = useState({})
    let [message, setMessage] = useState("");

    const handleChange = (event) => {
        let { name, value } = event.target;
        setUserData({ ...userData, [name]: value })
        if(message){
            setMessage("")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let result = await axios.post("http://localhost:3000/login", userData);

        setMessage(result.data.message);
        let token=result.data.token;

        localStorage.setItem("token", token);
        if(token){
            navigate("/profile")
        }
        setUserData({})
    }
    return (
        <div className="formBox">
            <div className="header">
                <h1>Welcome Back</h1>
                <span className="formDescription">Log in to your account</span>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Email:<br />
                    <input type="email" placeholder='Enter email' required
                        name="email" value={userData?.email || ""} onChange={handleChange} />
                </label>

                <label>
                    Password:<br />
                    <input type="password" placeholder='Enter password' required
                        name="password" value={userData?.password || ""} onChange={handleChange} />
                </label>

                <button>Log In</button>
            </form>
            {message ? <p className="message">{message}</p> : <></>}
            <div onClick={() => navigate("/signup")} className="switchPageBox">Not registered? Sign In</div>
        </div>
    )
}

export default LoginPage
