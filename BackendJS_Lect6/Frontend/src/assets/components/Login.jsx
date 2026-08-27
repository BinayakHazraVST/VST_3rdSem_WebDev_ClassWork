import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Login = ({ setIsRegistered }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post("http://localhost:2000/login", data);

        console.log(res.data)
    }

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                Email:
                <input type="email" placeholder='Enter your email...'
                    name="email" value={data.email}
                    onChange={handleChange} /><br />

                Password:
                <input type="password" placeholder='Enter password..'
                    name="password" value={data.password}
                    onChange={handleChange} /><br />

                <button>Submit</button>

                <div className='changeStatus' onClick={() => setIsRegistered(false)}>New User? Sign Up</div>
            </form>
        </div>
    )
}

export default Login
