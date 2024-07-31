import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) =>{
    const [productId,setProductId] = useState([]);
    const Contextvalue = {productId,setProductId}
    return (
        <AdminContext.Provider value={Contextvalue}>
        {props.children}
    </AdminContext.Provider>
    )
}
export default AdminContextProvider