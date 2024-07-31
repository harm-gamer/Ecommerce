import React from 'react'
import './Admin.css'
import { Routes,Route } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import EditProduct from '../../Components/EditProduct.jsx/EditProduct'
import AdminContextProvider from '../../Context/AdminContext'
const Admin = () => {
  return (
    <div className='admin'>
      <AdminContextProvider>

    
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>} />
        <Route path='/editProduct' element={<EditProduct/>}/>
      </Routes>
      </AdminContextProvider>
    </div>
  )
}

export default Admin
 