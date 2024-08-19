import React from 'react';
import './Home.css';
import Logout from '../../components/logout/Logout';

const Home = () => {
    
    return (
        <div className="home-container">
            <h1>Bem Vindo Amiguinho</h1>
            <p>Você está na HomePage</p>
            <Logout/>
        </div>
    );
};

export default Home;