import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
    
    const isAutennicated = localStorage.getItem('token')? true : false;

    return(isAutennicated?<Outlet/>:<Navigate to="/401"/>);

}

export default PrivateRouter;