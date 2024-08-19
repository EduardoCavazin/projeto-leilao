import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const Home = () => {
    const navigation = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigation('/login');
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