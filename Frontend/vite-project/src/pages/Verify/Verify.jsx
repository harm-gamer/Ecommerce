import React, { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import axios from 'axios'
const Verify = () => {
const navigate = useNavigate()

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId")
    const url = "http://localhost:5000"
    const VerifyPayment = async() =>{
        const response = await axios.post(url+"/verify",{success,orderId})
        if(response.data.success){
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=>{
        VerifyPayment();
    },[])
 
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
