import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Myorders = () => {

    const [data,setData] = useState([])
    const token = localStorage.getItem('auth-token')
     const myorders = async()=>{
        const response = axios.post('http://localhost:5000',{},{headers :{token}})
       setData(response.data.data)
     }
   
     useEffect(()=>{
        if(token){
            myorders()
            console.log(data)
        }
     },[])

  return (
    <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            }
                            )}</p>
                            <p>${order.amount}.00</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={myorders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
  )
}

export default Myorders
