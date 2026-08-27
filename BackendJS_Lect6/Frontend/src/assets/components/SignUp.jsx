
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const SignUp = ({ setIsRegistered }) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post("http://localhost:2000/signup", data);

        console.log(res.data)
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                Name:
                <input type="text" placeholder='Enter your name...'
                    name="name" value={data.name}
                    onChange={handleChange} /><br />
                Email:
                <input type="email" placeholder='Enter your email...'
                    name="email" value={data.email}
                    onChange={handleChange} /><br />

                Password:
                <input type="password" placeholder='Enter password..'
                    name="password" value={data.password}
                    onChange={handleChange} /><br />

                <button>Submit</button>

                <div className='changeStatus' onClick={() => setIsRegistered(true)}>Already registered? Login</div>
            </form>
        </div>
    )
}

export default SignUp
