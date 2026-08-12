// import React from 'react'
// import {useMemo, useState, useCallback} from 'react'
// import Child from './assets/components/Child'

// const App = () => {
//   const [count, setCount] = useState(0);

//   let data=useMemo(()=>{
//     let obj={
//       id:1,
//       name:"Binayak",
//     }

//     localStorage.setItem("key", JSON.stringify(obj));

//     let fetchObj=JSON.parse(localStorage.getItem("key"));
//     console.log(fetchObj);

//     let res=0;
//     for(let i=0;i<100000000;i++){
//       res+=i;
//     }

//     return res;
//   },[])

//   let fun=useCallback(()=>{
//     console.log("Demo function");
//   },[])


//   return (
//     <div>
//       <h1>{count}</h1>

//       <h2>data: {data}</h2>
//       <button onClick={()=> setCount((prev)=>prev+1)}>Add</button>
//       <Child name="Binayak" sem="3rd" fun={fun}/>
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react'

const App = () => {
  let [input, setInput]=useState("");

  return (
    <div>
      <input onChange={(e)=>setInput(e.target.value)} value= {input} type="text" placeholder="Enter name"/>

      <button onClick={()=>{
          localStorage.setItem("input",input)
          setInput("");
        }}>Add</button>

      <p>{localStorage.getItem("input")}</p>
    </div>
  )
}

export default App

