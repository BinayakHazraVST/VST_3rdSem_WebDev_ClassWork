import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddOrder = () => {
    const [newOrder, setNewOrder] = useState({})
    const [message, setMessage] = useState("");
    let token = localStorage.getItem("token");
    console.log(token)
    let navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert("Session expired. Please log in again...");
            navigate("/")
            return;
        }
    }, [token, navigate]);

    if (!token) {
        return null
    }

    const handleChange = (event) => {
        let { name, value } = event.target;

        setNewOrder({ ...newOrder, [name]: value });
        if (message) {
            setMessage("")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(newOrder.amount<0){
            alert("Please enter a valid amount");
            setNewOrder({});
            return;
        }

        let result = await axios.post("http://localhost:3000/orders", newOrder, {
            headers: {
                authorization: token
            }
        })

        setMessage(result.data.message);
        setNewOrder({});
    }
    return (
        <div className="formBox" id="addOrder">
            <div className="header">
                <h1>Add An Order</h1>
                <span className="formDescription">Fill details of new order</span>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:<br />
                    <input type="text" placeholder="Enter product name" required
                        name="productName" value={newOrder.productName || ""}
                        onChange={handleChange} />
                </label>

                <label>
                    Amount:<br />
                    <input type="number" placeholder="Enter amount" required
                        name="amount" value={newOrder.amount || 0}
                        onChange={handleChange} />
                </label>

                <button>Add product</button>
            </form>
            {message ? <p className="message">{message}</p> : <></>}
        </div>
    )
}

export default AddOrder
