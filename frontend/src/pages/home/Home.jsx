import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Logout from '../../components/logout/Logout';

const Home = () => {
    
    return (
        <div className="home-container">
            <h1>Bem Vindo Amiguinho</h1>
            <p>Você está na HomePage</p>
            <Link to="/login">Login</Link>
            <Logout/>
        </div>
    );
};

export default Home;