import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserChangeRole = () => {
    const { id } = useParams();
    let token=localStorage.getItem("token");
    let navigate=useNavigate();
    let [userdata, setUserData]=useState();
    let [loading, setLoading]=useState(true)
    let [newRole, setNewRole]=useState("");
    let [message, setMessage]=useState("");

    useEffect(()=>{
        if(!token){
            alert("Session expired. Please log in again...");
            navigate("/")
            return;
        }

        let fetchData=async()=>{
            let result=await axios.get(`http://localhost:3000/users/${id}`, {
                headers:{
                    authorization:token
                }
            });

            setUserData(result.data.data);
            setLoading(false)
        }
        fetchData();
    },[token, navigate, id])

    if(!token){
        return null;
    }

    if(loading){
        return <div style={{fontSize:"20px"}}>Loading...</div>
    }

    const handleChange=(event)=>{
        setNewRole(event.target.value);
        if(message!==""){
            setMessage("");
        }
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(newRole===""){
            alert("Please select a valid role");
            return;
        }

        let result=await axios.patch(`http://localhost:3000/users/${id}`, {role:newRole},
            {
                headers:{
                    authorization:token
                }
            }
        )

        setMessage(result.data.message);
        setUserData(result.data.data);   
        setNewRole("");     
    }

    return (
        <div className='formBox' id="userChangeRole">
            <div className='header'>
                <h1>Change Role</h1>
                <span className="formDescription">Select new Role</span>
            </div>

            <div className='oneUser'>
                <div>Name: {userdata?.name}</div>
                <div>Email: {userdata?.email}</div>
                <div>Role: {userdata?.role}</div>
            </div>

            <form onSubmit={handleSubmit} className='updateForm'>
                <label>
                    Select new Role:<br/>
                    <select name="role" onChange={handleChange} value={newRole}>
                        <option value="">Select new role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>

                <button>Update Role</button>
            </form>

        </div>
    )
}

export default UserChangeRole
