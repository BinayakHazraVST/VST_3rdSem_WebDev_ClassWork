import React, { useEffect } from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Orders = () => {
    const [orderDetails, setOrderDetails]=useState([]);
    let token=localStorage.getItem("token");
    let navigate=useNavigate();
    
    useEffect(()=>{
        if(!token){
            alert("Session expired. Please log in again");
            navigate("/");
            return;
        }

        let fetchOrderDetails=async()=>{
            let result=await axios.get("http://localhost:3000/my-orders",{
                headers:{
                    authorization:token
                }
            });

            setOrderDetails(result.data.data || []);
        }

        fetchOrderDetails();
    },[token, navigate])

    if(!token){
        return null;
    }

  return (
    <div className="formBox" id="orderDetailsBox">
        <div className="header">
            <h1>My Orders</h1>
            <span>Track all added orders</span>
        </div>
        {
            orderDetails.length!==0?
            orderDetails.map((elem)=>{
                return <div key={elem.id} className='oneOrder'>
                        <div>Order ID: {elem.id}</div>
                        <div>Product Name: {elem.productName}</div>
                        <div>Amount: ₹{elem.amount}</div>
                    </div>
            }):<div className="oneOrder">No orders added...</div>
        }
    </div>
  )
}

export default Orders
