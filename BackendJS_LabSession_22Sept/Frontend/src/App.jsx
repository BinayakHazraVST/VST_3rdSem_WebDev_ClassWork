import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [userData, setUserData] = useState({})
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUserData({ ...userData, [name]: value })

    if (message) {
      setMessage("");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("Processing your request...")
    try {
      let result = await axios.post("http://localhost:2000/users", userData);
      setMessage(result.data.message);
    } catch (error) {
      console.log("Error", error.message);
    }
    setUserData({});
  }
  return (
    <div className="formContainer">
      <div>
        <h1>Form</h1>
        <span>Share your details</span>

      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input type="text" placeholder='Enter your name' required
            onChange={handleChange} value={userData?.name || ""} name="name" />
        </label>

        <label>
          Email:<br />
          <input type="email" placeholder='Enter email' required
            onChange={handleChange} value={userData?.email || ""} name="email" />
        </label>

        <button>Submit</button>
      </form>
      {message ? <p>{message}</p> : <></>}
    </div>
  )
}

export default App
