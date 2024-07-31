import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'
const LoginSignup = () => {
  const [state,setState] = useState("Sign Up")
   const [formData,setFormData] = useState({
    username: "",
    email : "",
    password: "",
   });

   const login = async () =>{
    console.log("login button activated");
    const res = await fetch("http://localhost:5000/login",{
      method : "POST",
      headers : {
        Accept : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(formData)
    })

    const data = await res.json();
    if(data.success){
      localStorage.setItem('auth-token',data.token)
      window.location.replace("/")
    }
   }
   const Signup = async () =>{
   
     const res = await fetch("http://localhost:5000/signUp",{
      method : "POST",
      headers : {
        Accept : "application/form-data",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(formData)
    })

    const data = await res.json();
    if(data.success){
      localStorage.setItem('auth-token',data.token)
      window.location.replace("/")
    }
  
   }
   const changeHandler = (e) =>{
     setFormData({...formData,[e.target.name]:e.target.value})
     
   }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">

       {state === "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type= "text" placeholder='Your Name' ></input>:<></>}
        
        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
        <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        
      </div>
      <button onClick={()=>{state === "Sign Up"?Signup():login()}}>Continue</button>
      {state === 'Sign Up'?<p className='loginsignup-login'>Already have an account? <span onClick={() =>{setState("login")}}>Login here</span></p>
      :<p className='loginsignup-login'>Do not have account? <span onClick={() =>{setState("Sign Up")}}>Create account</span></p>}
      
      <div className="loginsignup-agree">
        <input type="checkbox"  name='' id=''/>
        <p>By continuing ,i agree to the terms of use & privacy policy.</p>
      </div>
      </div>
    </div>
  )
}

export default LoginSignup
