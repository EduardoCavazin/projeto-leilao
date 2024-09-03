import React, { useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleChange = (input) => {
        setUser({ ...user, [input.target.name]: input.target.value });
    }

    const login = () => {
        if (user.email === 'eduardo@eduardo' || user.password === '123456') {
            var token = 'token p/ backend';
            localStorage.setItem("token", token);
            localStorage.setItem("userEmail", user.email);
            navigate('/');
        } else {
            alert("Usuário ou senha inválidos");
        }
    }

    const buttons = (
        <>
            <Button 
                label={t('button.login')} 
                onClick={login} 
                className="w-full"
            />
            <Link to="/register">
                <Button 
                    label={t('button.register')} 
                    severity="help" 
                    className="w-full mt-2"
                />
            </Link>
        </>
    )

    return (
        <div className={style.loginContainer}>
            <Card title="Login" footer={buttons} className={style.cardContent}>
                <InputText 
                    placeholder="Email" 
                    onChange={handleChange} 
                    name="email" 
                    id="email" 
                    className={style.inputField}
                />
                <Password 
                    placeholder={t('password')}
                    toggleMask 
                    feedback={false} 
                    onChange={handleChange} 
                    name="password" 
                    id="password"
                    className={style.inputField}
                />
                <Link to="/forgot-password" className={style.forgotPasswordLink}>
                {t('recoverPassword')}
                </Link>
            </Card>
        </div>
    );
}

export default Login;
