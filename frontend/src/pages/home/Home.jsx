import React from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const {t} = useTranslation

    return (
        <div className="home-container">
            <h1>{t('welcome')}Bem Vindo Amiguinho</h1>
            <p>Você está na HomePage</p>
        </div>
    );
};

export default Home;