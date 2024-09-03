import React, { useState } from "react";
import style from "./AlterPassword.module.css";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";

function AlterPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation();

    const validatePassword = (password) => {
        const upperCase = /[A-Z]/.test(password);
        const lowerCase = /[a-z]/.test(password);
        const number = /\d/.test(password);
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const minLength = password.length >= 6;

        return {
            upperCase,
            lowerCase,
            number,
            specialChar,
            minLength
        };
    };

    const passwordValidation = validatePassword(newPassword);

    const isPasswordValid = Object.values(passwordValidation).every(Boolean) && newPassword === confirmPassword;

    const footer = (
        <>
            <Divider />
            <p className={style.requirementsTitle}>{t('requirements')}</p>
            <ul className={style.requirementsList}>
                <li className={passwordValidation.lowerCase ? style.valid : style.invalid}>{t('lowerCase')}</li>
                <li className={passwordValidation.upperCase ? style.valid : style.invalid}>{t('upperCase')}</li>
                <li className={passwordValidation.number ? style.valid : style.invalid}>{t('number')}</li>
                <li className={passwordValidation.specialChar ? style.valid : style.invalid}>{t('specialChar')}</li>
                <li className={passwordValidation.minLength ? style.valid : style.invalid}>{t('minLength')}</li>
            </ul>
        </>
    );

    const handleChangePassword = () => {
        // Lógica para alterar a senha
        console.log("Senha alterada com sucesso!");
    };

    return (
        <div className={style.alterPassContent}>
            <Card title={t('changePassword')} className={style.cardContent}>
                <div className={style.formGroup}>
                    <Password
                        placeholder={t('newPassword')}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        footer={footer}
                        toggleMask
                        className={style.passwordInput}
                    />
                </div>
                <div className={style.formGroup}>
                    <Password
                        placeholder={t('confirmNewPassword')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        toggleMask
                        feedback={false}
                        className={style.passwordInput}
                    />
                </div>
                <Button 
                    label={t('changePasswordButton')} 
                    onClick={handleChangePassword} 
                    disabled={!isPasswordValid} 
                    className={style.submitButton}
                />
            </Card>
        </div>
    );
}

export default AlterPassword;
