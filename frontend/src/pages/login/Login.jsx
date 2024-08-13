import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';


const Login = () => {
    const buttons = (
        <>
            <Button label="Entrar"/>
            <Button label="Cadastrar" severity='help' style={{ marginLeft: '0.5em' }}/>
        </>
    )

    return (
        <div className="login-container">
            <h1>Login</h1>
            <Link to="/">Home</Link>
            <Card title="Login" footer={buttons} className=" flex flex-colum">
                <InputText placeholder="Usuário" />
                <Password  toggleMask/>
                <Link to="/forgot-password" className="forgot-password-link">
                    Esqueceu a senha?
                </Link>
            </Card>
        </div>
    );
}

export default Login;