import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AllUserDetails = () => {
    let navigate=useNavigate();
    let token=localStorage.getItem("token");
    let [users,setUsers]=useState()
    let [activity,setActivity]=useState(0);
    let [message, setMessage]=useState("");

    useEffect(()=>{
        if(!token){
            alert("Please sign in again...");
            navigate("/login")
        }

        let fetchData=async()=>{
            let res=await axios.get("http://localhost:3000/allUsers", {
                headers:{
                    authorization:token
                }
            })
            setUsers(res.data.data);
            setMessage(res.data.message);
        }

        fetchData();
    },[token, navigate, activity]);

    if(!token){
        return null;
    }

    if(message){
        return <div>{message}</div>
    }

    if(!users){
        return <div>Setting things for you...</div>
    }

    const handleClick=(user)=>{
        setActivity((prev)=>prev+1)
        navigate(`/user/${user.id}`)
    }

  return (
    <div>
       <h1>Choose User</h1>
       <span>Select the user whose role to be changed:</span>

        {users.map((elem)=>{
            return <div key={elem.id} onClick={()=>handleClick(elem)} className="userDetails">
                <div>Name: {elem.name}</div>
                <div>Email: {elem.email}</div>
                <div>Role: {elem.role}</div>
            </div>
        })}
    </div>
  )
}

export default AllUserDetails
