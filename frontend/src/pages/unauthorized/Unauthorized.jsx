import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import style from "./Unauthorized.module.css";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={style.container}>
            <h1>{t('error401Title')}</h1>
            <p>{t('error401Message')}</p>
            <Button 
                label={t('backToLogin')} 
                onClick={() => navigate('/login')} 
                className={style.button} 
            />
        </div>
    );
};

export default Unauthorized;
