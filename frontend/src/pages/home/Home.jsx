import React from 'react';
import './Home.css';
import { useTranslation } from 'react-i18next';
import { Button } from 'primereact/button';

const Home = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (language) =>{
        i18n.changeLanguage(language);
    };

    return (
        <div className="home-container">
            <h1>{t('welcome')} Amiguinho</h1>
            <p>Você está na HomePage</p>
            <Button label="English" onClick={() => changeLanguage('en')} />
            <Button label="Português" onClick={() => changeLanguage('pt')} />
        </div>
    );
};

export default Home;