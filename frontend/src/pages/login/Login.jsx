import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';



const Login = () => {
    const [usuario, setUsuario] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (input) => {
        setUsuario({ ...usuario, [input.target.name]: input.target.value });
    }

    const login = () => {
        //Chamada do back-end para verificar credenciais
        if (usuario.email === 'eduardo@eduardo' || usuario.password === '123456') {
            var token = 'token p/ backend';
            localStorage.setItem("token", token);
            localStorage.setItem("usuario", usuario.email);
            console.log(usuario);
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
            <Link to="/">Home</Link>
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