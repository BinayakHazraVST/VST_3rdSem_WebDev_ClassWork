import React from "react";
import { useState } from "react";
import axios from "axios";

const SignupPage = ({ navigate }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [visible, setVisible] = useState("");

    const handleChange = (event) => {
        let { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async () => {
        let msg = await axios.post("http://localhost:3000/signup", userData);
        setVisible(msg.data);

        setUserData({
            name: "",
            email: "",
            password: "",
            role: "",
        });
    };

    console.log(userData.role);

    return (
        <div>
            <div className="authorizeBox">
                <h1>Sign Up</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <label>
                        Name:
                        <br/>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                        />
                    </label>

                    <label>
                        Email:
                        <br/>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            required
                        />
                    </label>

                    <label>
                        Password:
                        <br/>
                        <input
                            type="text"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </label>

                    <label>
                        Select Your role:
                        <br/>
                        <select name="role" onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <button onClick={handleSubmit}>Sign Up</button>
                </form>

                {visible ? <p>{visible}</p> : <></>}
                <div className="changeStatus" onClick={() => navigate("/")}>
                    Already Registered? Log In
                </div>
            </div>

        </div>
    );
};

export default SignupPage;
