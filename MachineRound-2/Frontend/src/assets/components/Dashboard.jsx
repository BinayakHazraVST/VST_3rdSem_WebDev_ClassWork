import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    let navigate = useNavigate();
    let [userData, setUserData] = useState();
    let token = localStorage.getItem("token");
    let [activity, setActivity] = useState(0);

    useEffect(() => {
        let fetchDetails = async () => {
            if (!token) {
                alert("Please log in again")
                navigate("/login")
            }

            let result = await axios.get("http://localhost:3000/me", {
                headers: {
                    authorization: token
                }
            })

            let data = result.data;

            if (data.data) {
                setUserData(data.data);
            }
        }

        fetchDetails();
    }, [token, activity, navigate])

    if (!token) {
        return null;
    }

    if (!userData) {
        return <div>Loading your details...</div>
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Hi! {userData.name.trim().split(" ")[0]}</h2>

            <h3>Your Details:</h3>
            <div>Name: {userData.name}</div>
            <div>Email: {userData.email}</div>
            <div>Role: {userData.role}</div>

            <h3>Want to update your name?</h3>
            <button onClick={() => {
                navigate("/changeName")
                setActivity((prev) => prev + 1)
            }}>Update Name</button>

            <div>
                {
                    userData.role === "admin" ?
                        <>
                            <h3>Want to update user role?</h3>
                            <button onClick={() => navigate("/changeRole")}>Change Roles of other users</button>
                        </> : <></>
                }
            </div>

            <h3>See Your Orders:</h3>
            <button onClick={()=> navigate(`/orders/${userData.id}`)}>Click here!!</button>
        </div>
    )
}

export default Dashboard
