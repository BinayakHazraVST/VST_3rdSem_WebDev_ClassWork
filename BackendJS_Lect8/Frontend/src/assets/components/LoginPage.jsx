import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const LoginPage = ({ navigate }) => {
    const [printMsg, setPrintMsg] = useState("");
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        let { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let msg = await axios.post("http://localhost:3000/login", data);

        setPrintMsg(msg.data.message);

        let token = msg.data.token;
        localStorage.setItem("token", token);

        setData({
            email: "",
            password: "",
        })
        if(token){
            navigate("/authorize");
        }
    }

    return (
        <div className='formPage'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:<br/>
                    <input type="text" placeholder='Enter your email' name="email"
                        value={data.email} onChange={handleChange}
                        required />
                </label>

                <label>
                    Password: <br/>
                    <input type="text" placeholder="Enter you password" name="password" required
                        value={data.password} onChange={handleChange} />
                </label>

                <button>Log In</button>
            </form>

            {
                printMsg ? <p>{printMsg}</p> : <></>
            }
            <div onClick={() => navigate("/signup")}
                className='changePage'>Not Registered? Sign Up</div>
        </div>
    )
}

export default LoginPage
