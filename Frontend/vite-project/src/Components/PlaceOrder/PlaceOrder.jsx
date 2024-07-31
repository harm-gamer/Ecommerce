import React, { useContext, useEffect, useState } from "react";
import './PlaceOrder.css'
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const {all_product,getTotalAmount,CartItems,removeCart} = useContext(ShopContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        all_product.map((item) => {
            console.log(CartItems[item.id])
            if (CartItems[item._id] > 0) {
                console.log(item)
                let itemInfo = item;
                itemInfo["quantity"] = CartItems[item.id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalAmount() + 2,
        }
        let response = await axios.post("http://localhost:5000/Order", orderData, { headers: { 'auth-token': localStorage.getItem('auth-token')} });
          console.log(response)
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("error")
        }
        const navigate = useNavigate()
        useEffect(()=>{
            if(!localStorage.getItem('auth-token')){
              navigate('/Cart')
            }else if(getTotalAmount()===0){
                 navigate('/Cart')
            }
        },[localStorage.getItem('auth-token')])
    }
    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">
                    Delivery information
                </p>
                <div className="multi-fields">
                    <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} id="" placeholder="First name" />
                    <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} id="" placeholder="Last name" />
                </div>
                <input required type="email" name="email" onChange={onChangeHandler} value={data.email} id="" placeholder="Email Address" />
                <input required type="text" name="street" onChange={onChangeHandler} value={data.street} id="" placeholder="street" />
                <div className="multi-fields">
                    <input required type="text" name="city" onChange={onChangeHandler} value={data.city} id="" placeholder="city" />
                    <input required type="text" name="state" onChange={onChangeHandler} value={data.state} id="" placeholder="state" />
                </div>
                <div className="multi-fields">
                    <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} id="" placeholder="Zip code" />
                    <input required type="text" name="country" onChange={onChangeHandler} value={data.country} id="" placeholder="Country" />
                </div>
                <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} id="" placeholder="Phone" />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
                        </div>
                    </div>
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}
export default PlaceOrder