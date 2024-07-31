import React from 'react'
import { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../Assests/upload_area.svg'
const AddProduct = () => {
     const [image,setImage] = useState(false);
     const [productdetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price :"",
        old_price :""
     })
     
     const imageChange = (e) =>{
        setImage(e.target.files[0])
     }
     const changeHandler = (e) =>{
        setProductDetails({...productdetails,[e.target.name]:e.target.value})
     }
     
     const buttonHandler =  async () =>{
       
   
      let product = productdetails;

      let formdata = new FormData();
      formdata.append("product",image);

     const res = await fetch('http://localhost:5000/upload',{
        
        method : "POST",
        headers : {
          Accept: 'application/json'
          // "Content-Type" : 'application/json'
        },
        body : formdata
      })
      const data = await res.json();
      console.log(data)
      console.log(productdetails)
      if(productdetails){
        productdetails.image = data.image_url;
        console.log(product)
        await fetch("http://localhost:5000/addproduct",{
          method :"POST",
          headers : {
            Accept: 'application/json',
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(product),
        }).then((res) => res.json() ).then((data) => {
          data.success?alert("product added"):alert("product not added");

        })
      }
     }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product tittle</p>
        <input value={productdetails.name} onChange={changeHandler} type="text" name='name' placeholder=' Type here' />
      </div>
      <div className="addproduct-price">

    
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input value={productdetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder=' Type here' />
      </div>
      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input  value={productdetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder=' Type here' />
      </div>
      </div>
      <div className="addproduct-itemfield">
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
      </div>
       <button onClick={() =>{buttonHandler()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
