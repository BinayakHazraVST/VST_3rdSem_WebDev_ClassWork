import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const AuthorizePage = () => {
  const [permitMessage, setPermitMessage] = useState("")
  let token=localStorage.getItem("token");

  let permit=async()=>{
    let msg=await axios.get("http://localhost:3000/authorize", {
      headers:{
        authorization: token
      }
    })

    setPermitMessage(msg.data);
  }

  useEffect(()=>{
    permit();
  },[])
  
  return (
    <div>
        {permitMessage}
    </div>
  )
}

export default AuthorizePage
