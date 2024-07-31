import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const EditProduct = () => {
    const {productId} = useContext(AdminContext);
    console.log(productId);
    const [editData,seteditData] = useState({
      name: '',
      new_price : '',
      old_price : ''
    })

    const changeHandler = (e) =>{
      seteditData({...editData,[e.target.name]:e.target.value})
    
    }
   const edit = async () =>{
    const response = await fetch("http://localhost:5000/editProduct",{
      method: "POST",
      headers : {
        Accept : "application/form_data",
        "Content-Type" : "application/json",
         
      },
      body : JSON.stringify(editData)
    }).then((res)=>res.json())
    .then(() => window.alert("updated"))
   }
  return (
    <div className='EditProduct'>
       <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product tittle</p>
        <input value={editData.name} onChange={changeHandler} type="text" name='name' placeholder=' Type here' />
      </div>
      <div className="addproduct-price">

    
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input value={editData.old_price} onChange={changeHandler} type="text" name='old_price' placeholder=' Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input  value={editData.new_price} onChange={changeHandler} type="text " name='new_price' placeholder=' Type here' />
      </div>
      </div>
      {/* <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productdetails.category} onChange={changeHandler} name="category" className='add-product-selector' id="">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img className="addproduct-thumbnail-img" src={image?URL.createObjectURL(image):upload_area} alt="upload_area" />

        </label>
        <input onChange={imageChange} type="file" name='image' id='file-input' hidden />
      </div> */}
       <button className='addproduct-btn'>ADD</button>
    </div>
    </div>
  )
}

export default EditProduct
