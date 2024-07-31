import React from 'react'
// import new_collection from "../Assets/new_collections.js"
import "./NewCollection.css"
import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
const NewCollection = () => {
  const [newCollection,setNewCollection] = useState([])
  useEffect(  ()=>{
   fetch('http://localhost:5000/newcollection')
    .then(res=>res.json())
    .then((data) => setNewCollection(data));
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name}  image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollection
