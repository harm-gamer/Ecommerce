import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product"
import Cart from "./pages/Cart.jsx"
import Login from "./pages/LoginSignup.jsx"
import Footer  from './Components/Footer/Footer.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';
import men_banner from "./Components/Assets/banner_mens.png"
import women_banner from "./Components/Assets/banner_women.png"
import kid_banner from "./Components/Assets/banner_kids.png"
import PlaceOrder from './Components/PlaceOrder/PlaceOrder.jsx';
import Verify from './pages/Verify/Verify.jsx';
import Myorders from './Components/Myorders/Myorders.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ShopContextProvider>
  <BrowserRouter>

   <App />   
   <Routes>
    <Route path='/' element={<Shop/>}/>
    <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
    <Route path='/womens' element={<ShopCategory banner={women_banner} category='women'/>}/>
    <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kid'/>}/>
    <Route path='/product' element={<Product />}>
    <Route path=':productId' element={< Product/>}/>
    </Route>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/placeorder' element={<PlaceOrder/>} />
    <Route path='/verify' element={
      <Verify/>}/>
      <Route path='/myorder' element={<Myorders/>}/>
  </Routes>
  <Footer/>
  
  </BrowserRouter>
  </ShopContextProvider>
  
)
