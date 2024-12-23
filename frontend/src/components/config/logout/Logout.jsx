import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logout = () => {
    const { t } = useTranslation();
    const navigation = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        navigation('/login');
    }

    return(
        <>
            <Button label={t('logout')} onClick={logout} severity="danger"/>
        </>
    );
}

export default Logout;