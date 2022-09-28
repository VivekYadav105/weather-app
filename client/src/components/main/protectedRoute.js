import React from "react"
import { Navigate } from "react-router-dom";
const ProtectedRoute = (user,redirectRoute="/login",children)=>{
    return(
        user?children:<Navigate to={redirectRoute}></Navigate>
    )
}
export default ProtectedRoute;
