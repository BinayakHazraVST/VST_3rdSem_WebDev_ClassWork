import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const SignupPage = ({ navigate }) => {
  const [printMsg, setPrintMsg] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  console.log(data.role)

  const handleChange = (event) => {
    let { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let msg = await axios.post("http://localhost:3000/signup", data);

    setPrintMsg(msg.data);

    setData({
      name: "",
      email: "",
      password: "",
      role: "user",
    })
  }

  return (
    <div className='formPage'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" placeholder='Enter your name' name="name"
            value={data.name} onChange={handleChange}
            required />
        </label>

        <label>Email:<br />
          <input type="text" placeholder='Enter your email' name="email"
            value={data.email} onChange={handleChange}
            required />
        </label>

        <label>
          Password: <br />
          <input type="text" placeholder="Enter you password" name="password" required
            value={data.password} onChange={handleChange} />
        </label>

        <label>Role:
          <select onChange={handleChange} name="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button>Sign Up</button>
      </form>

      {
        printMsg ? <p>{printMsg}</p> : <></>
      }
      <div onClick={() => navigate("/")}
        className='changePage'>Already Registered? Log In</div>
    </div>
  )
}

export default SignupPage
