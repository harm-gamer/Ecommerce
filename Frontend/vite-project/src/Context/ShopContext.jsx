import React, { createContext, useState } from 'react'
import { useEffect } from 'react';

export const ShopContext = createContext(null);
// import all_product from "../Components/Assets/all_product.js"

  const getDefalutCart =()=>{
     let cart = {};
     for(let index = 0;index< 300+1;index++){
        cart[index] = 0;
     }
     return cart;
  }
 
const ShopContextProvider = (props) =>{
     const [CartItems,setCartItems] = useState(getDefalutCart());
     const [all_product,setAllProduct] = useState([])
     
        const addToCart = (itemId) =>{
            setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:5000/addtocart',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept : "application/form-data",
                        'auth-token':localStorage.getItem('auth-token')
                    },
                    body: JSON.stringify({"ItemId" : itemId})
                }).then(res => res.json())
                .then(data => console.log(data))
            }
            
        }
        const getTotalAmount = () => {
            let TotalAmount = 0;
             for(const item in CartItems){
                if(CartItems[item]>0){
                    let itemInfo = all_product.find((Product) => Product.id === Number(item))
                    TotalAmount += itemInfo.new_price*CartItems[item];
                }
                
             }
             return TotalAmount;
        }
        const getTotalQuantity = () =>{
            let totalqunatity = 0;
            for(const item in CartItems){
                if(CartItems[item]>0){
                    totalqunatity+= CartItems[item]
                }
            }
            return totalqunatity
          }
        const removeCart = ((itemId) =>{
            setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]-1}))
            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:5000/removefromCart',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept : "application/form-data",
                        'auth-token':localStorage.getItem('auth-token')
                    },
                    body: JSON.stringify({"ItemId" : itemId})
                })
                .then((res) =>res.json())
            }
        })
        useEffect( ()=>{
         fetch('http://localhost:5000/allProducts')
           .then((response) => response.json())
           .then((data) => setAllProduct(data))

           if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/getCart',{
                method:'POST',
                headers :{
                    'Content-Type' : 'application/json',
                    'auth-token' : localStorage.getItem('auth-token'),
                    Accept : 'application/json'
                },
                body: ""
            })
            .then((res) => res.json())
            .then((data) => {setCartItems(data)})
           }
        },[])
   const ContextValue = {getTotalAmount,getTotalQuantity,all_product,CartItems,addToCart,removeCart};

   return (
    <ShopContext.Provider value={ContextValue}>
        {props.children}
    </ShopContext.Provider>
   )
}
 export default ShopContextProvider;