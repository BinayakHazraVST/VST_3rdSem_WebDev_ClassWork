import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react'

const ChangeRole = () => {
    let token = localStorage.getItem("token");
    let [usersData, setUsersData] = useState([]);
    let navigate = useNavigate();
    let [message, setMessage] = useState("");
    let [loading, setLoading]=useState(true);

    useEffect(() => {
        if (!token) {
            alert("Session expired. Please log in again");
            navigate("/");
            return;
        }

        let fetchData = async () => {
            let result = await axios.get("http://localhost:3000/allUsers", {
                headers: {
                    authorization: token
                }
            })

            if(result.data.message==="All users fetched"){
                setUsersData(result.data.data);
            }else{
                setMessage(result.data.message);
            }
            setLoading(false);
        }

        fetchData();
    }, [token, navigate])

    if (!token) {
        return null;
    }

    if(loading){
       return <div style={{fontSize:"20px"}}>User Details is loading for you...</div>
    }

    if(message){
        return <div style={{fontSize:"20px"}}>{message}</div>
    }

    return (
        <div className='formBox' id="changeRolePage">
            <div className="header">
                <h1>Change Role</h1>
                <span className="formDescription">Choose user whose role to be changed</span>
            </div>

            {
                usersData.length !== 0 ?
                    usersData.map((elem) => {
                        return <div key={elem.id} className='oneUser' onClick={()=>navigate(`/user/${elem.id}`)}>
                            <div>Name: {elem.name}</div>
                            <div>Email: {elem.email}</div>
                            <div>Role: {elem.role}</div>
                        </div>
                    }) : <div className="oneOrder">User Details loading for you...</div>
            }
        </div>
    )
}

export default ChangeRole
