import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
    let {id}=useParams();
    const [userOrders, setUserOrders] = useState();
    let token = localStorage.getItem("token");
    let navigate = useNavigate()
    const [newOrder, setNewOrder]=useState({userId:id});
    const [message, setMessage]=useState("");
    const [activity, setActivity]=useState(0);

    useEffect(() => {
        if (!token) {
            alert("Please sign in again...");
            navigate("/login");
        }

        const fetchOrders = async () => {
            let orders = await axios.get("http://localhost:3000/my-orders", {
                headers: {
                    authorization: token,
                }
            })

            setUserOrders(orders.data.data);
        }

        fetchOrders();
    }, [token, navigate, activity])

    if (!token) {
        return null;
    }

    if (!userOrders) {
        return <div>Loading your orders...</div>
    }

    const handleChange=(event)=>{
        let {name, value}=event.target;
        setNewOrder({...newOrder, [name]:value})
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        setActivity((prev)=>prev+1);

        if(newOrder.amount<0){
            alert("Give a valid product price")
            return;
        }
        
        if(newOrder.productName.trim()===""){
            alert("Enter a valid product name");
            return;
        }

        let updatedOrders=await axios.post("http://localhost:3000/orders", newOrder, {
            headers:{
                authorization:token
            }
        })

        setMessage(updatedOrders.data.message);

        setNewOrder({userId:id});

    }

    return (
        <div>
            {userOrders.length === 0 ? <div>No orders found...</div> :
                <div>
                    {userOrders.map((elem) => {
                        return <div key={elem._id} className="orderDetails">
                            <div>Product name: {elem.productName}</div>
                            <div>Amount: {elem.amount}</div>
                        </div>
                    })}
                </div>
            }
            
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input type="text" placeholder="Enter product name" 
                    name="productName"
                    value={newOrder?.productName || ""} onChange={handleChange}/>
                </label><br/><br/>

                <label>
                    Product Price:
                    <input type="number" placeholder="Enter product price"
                    name="amount"
                    value={newOrder?.amount || 0} onChange={handleChange}/>
                </label><br/><br/>

                <button>Add order</button>
                {message? <p>{message}</p>:<></>}
            </form>


        </div>
    )
}

export default OrdersPage
