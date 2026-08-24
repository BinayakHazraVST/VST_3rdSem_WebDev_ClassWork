import React from 'react'
import { useEffect} from 'react'
import axios from 'axios';
import { useState } from 'react';

const App = () => {
  let [apiData, setApiData]=useState([])
  useEffect(()=>{
    async function api(){
      let res=await axios.get("http://localhost:2000/")
      console.log(res.data);

      setApiData(res.data)
    }
    api()
  },[])
  return (
    <>
    {
      apiData.map((elem)=>{
        return (<><h1>{elem.id}</h1>
        <h2>{elem.name}</h2></>)
      })
    }
    </>
  )
}

export default App
