import React from 'react'
import './Popular.css'

import Item  from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
const Popular = () => {
  const [product,setProduct] = useState([])

  useEffect( () =>{
    fetch('http://localhost:5000/popularInWomen')
    .then((res)=> res.json())
    .then((data) => setProduct(data))
  },[])
  return (
    <div className='popular'>
      <h1> POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} /> 
        })}
      </div>
    </div>
  )
}

export default Popular
