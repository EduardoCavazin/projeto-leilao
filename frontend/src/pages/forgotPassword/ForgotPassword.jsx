import React, { useState, useRef } from "react";
import style from "./ForgotPassword.module.css";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonService from "../../services/PersonSerice";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const toast = useRef(null); 
    const navigate = useNavigate();
    const { t } = useTranslation();

    const sendRecoveryCode = async () => {
        try {
            const personService = new PersonService();
            await personService.requestPasswordCode(email);

            toast.current.show({
                severity: "success",
                summary: t("success"),
                detail: t("codeSent"),
                life: 3000,
            });

            setTimeout(() => {
                navigate("/alter-password", { state: { email } });
            }, 3000);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("emailNotFound"),
                life: 3000,
            });
        }
    };

    return (
        <div className={style.forgotPassContainer}>
            <Toast ref={toast} /> 
            <Card title={t("recoverPassword")} className={style.cardContent}>
                <p>{t("enterEmail")}</p>
                <InputText
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    label={t("sendCode")}
                    severity="warning"
                    onClick={sendRecoveryCode}
                    className={style.submitButton}
                />
            </Card>
        </div>
    );
};

export default ForgotPassword;
