import React from 'react';
import style from './Home.module.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();


    return (
        <div className={style.homeContainer}>
            <h1>{t('welcome')} Amiguinho</h1>
            <p>Você está na HomePage</p>
        </div>
    );
};

export default Home;