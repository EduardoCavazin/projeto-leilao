import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
        


const Login = () => {
    const buttons = (
        <>
            <Button label="Entrar"/>
            <Button label="Cadastrar" severity='help' style={{ marginLeft: '0.5em' }}/>
        </>
    )

    return (
        <div className="login-container">
            <Link to="/">Home</Link>
            <Card title="Login" footer={buttons}>
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