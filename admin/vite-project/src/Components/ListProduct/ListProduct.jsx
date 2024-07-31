import React, { useContext, useEffect, useState } from 'react'
import './ListProduct.css'
import cart_cross_icon from "../../Assests/cart_cross_icon.png"
import {  Link }from 'react-router-dom'
import { AdminContext } from '../../Context/AdminContext'

const ListProduct = () => {
    const [allProducts,setAllProducts] = useState([]);
    const {setProductId} = useContext(AdminContext)
    const ProductInfo = async () =>{
        const response = await fetch('http://localhost:5000/allProducts');
        const data=  await response.json();
        console.log(data)
        setAllProducts(data);
    }
    // console.log(allProducts)
    const remove_product =  async (id) =>{
      await fetch("http://localhost:5000/removeproduct",{
        method: "POST",
        headers : {
          Accept : 'application/json',
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({id:id})
      })
      await ProductInfo()
    }
    useEffect(() =>{
        ProductInfo();
       
    },[])
  return (
   

    <div className='list-Product'>
      <h1>ALL PRODUCTS LIST</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>old_price</p>
        <p>new_price</p>
        <p>category</p>
        <p>remove</p>
      </div>
      <div className="listproduct-allproducts">
         {allProducts.map((product,index) =>{
            return <>
                <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className='listproduct-product-icon' />
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.old_price}</p>
                    <p>{product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={() =>{remove_product(product.id)}} className="listproduct-remove-icon" src={cart_cross_icon} alt="" />
                    <Link to={"/editProduct"}> 
                    <button onClick={setProductId(product)} className='edit-product-btn'>Edit</button>
                    </Link>
                   
                </div>
                <hr />
            </>
         })}
      </div>

    </div>
  )
}

export default ListProduct 
