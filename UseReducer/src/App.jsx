import React, { useReducer } from 'react'

const App = () => {
  let data={
    input:"",
    list:[]
  }

  function reduser(state, action){
    if(action.type=="inp"){
      return {
        ...state,
        input:action.payload,
      }
    }else if(action.type=="add"){
      return {
        ...state,
        list:[...state.list, state.input],
        input:"",
      }
    }else if(action.type=="del"){
      let arr=state.list.filter((elem,index)=>index!==action.val)
      return{
        ...state,
        list:arr
      }
    }else{
      return{
        ...state,
      }
    }
  }

  let [state, dispatch]=useReducer(reduser, data)
  return (
    <div>
      <input 
      onChange={(e)=>dispatch({type:"inp", payload:e.target.value})}
      value={state.input}/>

      <button onClick={()=> dispatch({type:"add"})}>Add</button>

      <ol>
        {state.list.map((elem,index)=>{
          return <li key={index}
          onClick={()=>dispatch({type:"del" , val:index})}>{elem}</li>
        })}
      </ol>
    </div>
  )
}

export default App
