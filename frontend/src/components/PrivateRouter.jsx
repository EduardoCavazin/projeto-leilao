import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
    
    const isAuthenticated = localStorage.getItem('token')? true : false;

    return(isAuthenticated?<Outlet/>:<Navigate to="/401"/>);

}

export default PrivateRouter;