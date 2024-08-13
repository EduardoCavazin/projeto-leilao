import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ForgotPassword = () => {
    const buttons = (
        <>
            <Button label="Recuperar senha" severity="warning" />
        </>
    )
    
    return (
        <div className="forgotPass-container">
            <Link to="/">Home</Link>
            <Card title="Recuperar senha" footer={buttons}>
                <p>
                    Insira o e-mail cadastrado para recuperar a senha.
                </p>
                <InputText placeholder="E-mail" />
            </Card>
        </div>
    );
}

export default ForgotPassword;