import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const LoginPage = ({ navigate }) => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const [visible, setVisible] = useState("")

    const handleChange = (event) => {
        let { name, value } = event.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = async () => {
        let msg = await axios.post("http://localhost:3000/login", userData);
        setVisible(msg.data);
        
        setUserData({
            email: "",
            password: ""
        })
    }

    return (
        <div>
            <div className='authorizeBox'>
                <h1>Log In</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <label>
                        Email:<br />
                        <input type="text" name="email" value={userData.email}
                            onChange={handleChange} placeholder='Enter your Email' />
                    </label>

                    <label>
                        Password: <br />
                        <input type="text" name="password" value={userData.password}
                            onChange={handleChange} placeholder='Enter your password' />
                    </label>


                    <button onClick={handleSubmit}>Log in</button>

                </form>
                {visible ? <p>{visible}</p> : <></>}
                <div className="changeStatus" onClick={() => navigate("/sigup")}>Not Registered? Sign Up</div>
            </div>

        </div>
    )
}

export default LoginPage
