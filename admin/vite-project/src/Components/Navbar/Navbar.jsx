import React from 'react'
import "./Navbar.css"
import nav_logo from  "../../Assests/nav-logo.svg"
import nav_profile from "../../Assests/nav-profile.svg"
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_logo} alt="" className='nav-logo' />
      <span>SHOPPER</span>
      <img src={nav_profile} alt="" className='nav-profile'/>
    </div>
  )
}

export default Navbar
