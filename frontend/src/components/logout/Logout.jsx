import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigation = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigation('/login');
    }

    return(
        <>
            <Button label='Sair' onClick={logout} severity="danger"/>
        </>
    );
}

export default Logout;