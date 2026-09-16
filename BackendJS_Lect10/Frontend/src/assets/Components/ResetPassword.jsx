import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [message,setMessage]=useState("")
    let navigate = useNavigate();
    let { token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let result = await axios.post(`http://localhost:3000/reset-password/${token}`, { password: newPassword });

        setMessage(result.data.message);
        setNewPassword("");
        navigate("/")
    }
    return (
        <div className="formBox" onSubmit={handleSubmit}>
            <div className="header">
                <h1>Reset Password</h1>
                <span className="formDescription">Enter new password</span>
            </div>

            <form>
                <label>
                    New Password:<br />
                    <input type="text" placeholder="Enter new password"
                        required
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </label>

                <button>Reset</button>
            </form>
            {message? <p className="message">{message}</p>:<></>}
            <div onClick={()=>navigate("/")} className="switchPageBox">Login Again</div>
        </div>
    )
}

export default ResetPassword
