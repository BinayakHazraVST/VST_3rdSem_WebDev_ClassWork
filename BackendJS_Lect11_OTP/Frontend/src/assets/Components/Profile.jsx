import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const [userData, setUserData] = useState();
    const [changeName, setChangeName]=useState(false);
    const [newName, setNewName]=useState("");
    
    let token=localStorage.getItem("token");
    let navigate=useNavigate();

    useEffect(()=>{
        if(!token){
            alert("Session expired. Please log in");
            navigate("/");
            return;
        }

        let fetchData=async()=>{
            let result=await axios.get("http://localhost:3000/me", {
                headers:{
                    authorization:token
                }
            })

            setUserData(result.data.data);
        }

        fetchData();
    }, [token, navigate])

    if(!token){
        return null;
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();

        let result=await axios.post("/me", {name:newName}, {
            headers:{
                authorization:token
            }
        })

        setUserData(result.data.data);
        setChangeName(false);
    }

  return (
    <div className="formBox" id="profilePage">
      <div className='header'>
        <h1>My Profile</h1>
        <span>My user details</span>
      </div>
    
        <div className="profileDetails">
            {userData? <div>
                <div>Name: {userData.name}</div>
                <div>Email: {userData.email}</div>
                <div>Role: {userData.role}</div>
            </div> : <div>Loading your Details...</div>
            }
        </div> 

        <div className="switchPageBox"
        onClick={()=>setChangeName(true)}>Want to update name? Click here</div>

       {
        changeName? <form className="updateForm" onSubmit={handleSubmit}>
            <label>
                Name:<br/>
                <input type="text" placeholder='Enter new name' required
                value={newName} onChange={(event)=>{
                    setNewName(event.target.value)
                }}/>
            </label>

            <button>Update Name</button>
        </form>:<></>
       }

    </div>
  )
}

export default Profile
