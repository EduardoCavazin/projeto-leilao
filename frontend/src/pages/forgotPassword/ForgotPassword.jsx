import React, { useState } from "react";
import style from"./ForgotPassword.module.css";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputOtp } from 'primereact/inputotp';
import { useTranslation } from "react-i18next";


const ForgotPassword = () => {
    const [token, setTokens] = useState('');
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();
    
    const isTokenValid = token.length > 0;
    const buttons = (
        <>
            <Button label={t('recoverPassword')} severity="warning" onClick={() => setVisible(true)} />
        </>
    )

    return (
        <div className={style.forgotPassContainer}>
            <Card title="Recuperar senha" footer={buttons} className={style.cardContent}>
                <p>
                {t('enterEmail')}
                </p>
                <InputText placeholder={t('email')} />
                <Dialog header={t('alert')} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false);}}>
                    <div className={style.dialogContent}>
                        <p className="m-0">
                        {t('verificationEmail')}
                        </p>
                        <InputOtp value={token} onChange={(e) => setTokens(e.value)} integerOnly />
                        <Button label={t('verify')} className="p-mt-2" disabled={!isTokenValid}/>
                    </div>
                </Dialog>
            </Card>
        </div>
    );
}

export default ForgotPassword;