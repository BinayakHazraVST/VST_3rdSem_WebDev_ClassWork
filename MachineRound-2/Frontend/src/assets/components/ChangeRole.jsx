import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ChangeRole = () => {
    let { id } = useParams();
    let token = localStorage.getItem("token");
    let [userData, setUserData] = useState()
    let [message, setMessage] = useState("");
    let [role, setRole]=useState("")
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("Please sign in again...");
            navigate("/login")
        }

        let fetchData = async () => {
            let res = await axios.get(`http://localhost:3000/users/${id}`, {
                headers: {
                    authorization: token
                }
            })
            setUserData(res.data.data);
        }

        fetchData();
    }, [token, navigate, id]);

    if (!token) {
        return null;
    }

    if (!userData) {
        return <div>Loading User Info...</div>
    }

    const handleChange=(event)=>{
        setRole(event.target.value);
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        let userIndividual=await axios.patch(`http://localhost:3000/users/${id}`, {role}, {
            headers:{
                authorization:token
            }
        })

        setUserData(userIndividual.data.data);
        setMessage(userIndividual.data.message);
    }

    return (
        <div>
            <div>
                <div>Name: {userData.name}</div>
                <div>Email: {userData.email}</div>
                <div>Role: {userData.role}</div>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>Change role</h2>
                <select onChange={(e)=>handleChange(e)}>
                    <option value="">Select role </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button>Update Role</button>
            </form>    
            {message? <p>{message}</p>:<></>}    
            <div onClick={()=>navigate("/dashboard")}>Click to return to dashboard</div>
        </div>
    )
}

export default ChangeRole
