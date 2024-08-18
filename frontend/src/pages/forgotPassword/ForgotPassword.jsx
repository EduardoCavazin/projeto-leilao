import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputOtp } from 'primereact/inputotp';


const ForgotPassword = () => {
    const [token, setTokens] = useState('');
    const [visible, setVisible] = useState(false);
    
    const isTokenValid = token.length > 0;
    const buttons = (
        <>
            <Button label="Recuperar senha" severity="warning" onClick={() => setVisible(true)} />
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
                <Dialog header="Aviso" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <div className="dialog-content">
                        <p className="m-0">
                            Foi enviado um e-mail para sua conta contendo um códio de verificação.
                            Insira o código no campo abaixo para ser redirecionado à página de alteração de senha.
                        </p>
                        <InputOtp value={token} onChange={(e) => setTokens(e.value)} integerOnly />
                        <Button label="Verificar" className="p-mt-2" disabled={!isTokenValid}/>
                    </div>
                </Dialog>
            </Card>
        </div>
    );
}

export default ForgotPassword;