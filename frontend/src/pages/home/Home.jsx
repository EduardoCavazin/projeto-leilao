import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const Home = () => {
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login';
    }
    
    return (
        <div className="home-container">
            <h1>Bem Vindo Amiguinho</h1>
            <p>Você está na HomePage</p>
            <Link to="/login">Login</Link>

            <Button label='Sair' onClick={logout}/>
        </div>
    );
};

export default Home;