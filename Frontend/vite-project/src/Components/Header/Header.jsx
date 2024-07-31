import React, { useContext, useRef } from 'react'
import "./Header.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from "../Assets/dropdown_icon.png"
import admin_icon from "../../assets/admin_icon.svg"
const Header = () => {
  const {getTotalQuantity} = useContext(ShopContext);

  const[Menu,setMenu] = useState("shop");
  const menuRef = useRef();
  const dropdown_toggle = (e) =>{
      menuRef.current.classList.toggle('nav-item-visible');
      e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
       <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>SHOPPER</p>
       </div>
       <img className='dropdown_icon' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
       <ul ref={menuRef} className='nav-item'>
         <li onClick={() => setMenu("Shop")}><Link style={{textDecoration : 'none'}} to="/">Shop</Link> {Menu==="shop"?<hr />:<></>}</li>
         <li onClick={() => setMenu("mens")}><Link style={{textDecoration : 'none'}} to="/mens">mens</Link>  {Menu==="mens"?<hr />:<></>}</li>
         <li onClick={() => setMenu("womens")}><Link style={{textDecoration : 'none'}} to="/womens">Womens</Link> {Menu==="womens"?<hr />:<></>}</li>
         <li onClick={() => setMenu("kids")}><Link style={{textDecoration : 'none'}} to="/kids">Kids</Link> {Menu==="kids"?<hr />:<></>}</li>
       </ul>
       <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')?<button onClick={() => {localStorage.removeItem('auth-token')}}>logout</button> 
        : <Link to="/Login"><button>Login</button></Link>}
        
       
       <Link to="/Cart"><img src={cart_icon} alt="" /></Link> 
        <div className='nav-cart-count'>{getTotalQuantity()}</div>
        <Link to="/myorder">
        <img src={admin_icon} /></Link>
         
       </div>
    </div>
  )
}

export default Header
