import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import style from "./NotFound.module.css";

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={style.container}>
            <h1>{t('error404Title')}</h1>
            <p>{t('error404Message')}</p>
            <Button 
                label={t('backToHome')} 
                onClick={() => navigate('/')} 
                className={style.button} 
            />
        </div>
    );
};

export default NotFound;
