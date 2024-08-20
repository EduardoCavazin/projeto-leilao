import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';



const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const login = () => {
        //Chamada do back-end para verificar credenciais
        if (user.email === 'eduardo@eduardo' || user.password === '123456') {
            var token = 'token p/ backend';
            localStorage.setItem("token", token);
            localStorage.setItem("usuario", user.email);
            console.log(user);
            navigate('/');
        }else{
            alert("Usuário ou senha inválidos");
        }
    }

    const buttons = (
        <>
            <Button label="Entrar" onClick={login} />
            <Link to="/register">
                <Button label="Cadastrar" severity='help' style={{ marginLeft: '0.5em' }} />
            </Link>
        </>
    )

    return (
        <div className="login-container">
            <Card title="Login" footer={buttons}>
                <InputText placeholder="Email" onChange={handleChange} name='email' id="email" />
                <Password toggleMask feedback={false} onChange={handleChange} name="password" id="password" />
                <Link to="/forgot-password" className="forgot-password-link">
                    Esqueceu a senha?
                </Link>
            </Card>
        </div>
    );
}

export default Login;