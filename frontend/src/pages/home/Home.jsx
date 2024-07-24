import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bem Vindo Amiguinho</h1>
            <p>Você está na HomePage</p>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;