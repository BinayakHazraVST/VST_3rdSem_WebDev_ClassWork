import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ChangeName = () => {
    let token = localStorage.getItem("token");
    const [userName, setUserName] = useState("");
    const [displayMessage, setDisplayMessage] = useState("");
    const [userData, setUserData] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("Please sign in again...");
            navigate("/login");
        }
    }, [token, navigate])

    if (!token) {
        return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userName.trim() === "") {
            alert("Enter a valid name");
            return;
        }

        setUserName("");

        let result = await axios.put("http://localhost:3000/me", { name: userName }, {
            headers: {
                authorization: token
            }
        })

        setDisplayMessage(result.data.message);
        setUserData(result.data.data);
    }
    return (
        <div>
            <h1>Update Name</h1>
            <form onSubmit={handleSubmit}>
                <label>New Name:
                    <input type="text" placeholder='Type new name'
                        value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>

                <button>Update name</button>
            </form>
            {displayMessage ? <p>{displayMessage}</p> : <></>}

            {userData ?
                <div>
                    <h3>Updated User Details:</h3>
                    <div>Name: {userData.name}</div>
                    <div>Email: {userData.email}</div>
                    <div>Role: {userData.role}</div>
                </div> : <></>
            }

            <div onClick={() => navigate("/dashboard")}>Return to Dashboard? Click here!!</div>
        </div>
    )
}

export default ChangeName
