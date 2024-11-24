import React, { useState } from "react";
import style from "./AlterPassword.module.css";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import PersonService from "../../services/PersonSerice";

function AlterPassword() {
    const [recoveryCode, setRecoveryCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = React.useRef(null); 
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || ''; 

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

    const isPasswordValid = 
        Object.values(passwordValidation).every(Boolean) && 
        newPassword === confirmPassword && 
        recoveryCode.trim().length > 0;

    const handleChangePassword = async () => {
        try {
            const personService = new PersonService();
            await personService.resetPassword({ email, recoveryCode, newPassword });

            toast.current.show({
                severity: "success",
                summary: t("success"),
                detail: t("passwordChanged"),
                life: 3000,
            });

            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("errorChangingPassword"),
                life: 3000,
            });
        }
    };

    const footer = (
        <>
            <Divider />
            <p className={style.requirementsTitle}>{t('passwordRequirements')}</p>
            <ul className={style.requirementsList}>
                <li className={passwordValidation.lowerCase ? style.valid : style.invalid}>{t('lowerCase')}</li>
                <li className={passwordValidation.upperCase ? style.valid : style.invalid}>{t('upperCase')}</li>
                <li className={passwordValidation.number ? style.valid : style.invalid}>{t('number')}</li>
                <li className={passwordValidation.specialChar ? style.valid : style.invalid}>{t('specialChar')}</li>
                <li className={passwordValidation.minLength ? style.valid : style.invalid}>{t('minLength')}</li>
            </ul>
        </>
    );

    return (
        <div className={style.alterPassContent}>
            <Toast ref={toast} />
            <Card title={t('changePassword')} className={style.cardContent}>
                <div className={style.formGroup}>
                    <InputText 
                        placeholder={t('recoveryCode')} 
                        value={recoveryCode} 
                        onChange={(e) => setRecoveryCode(e.target.value)} 
                        className={style.inputField} 
                    />
                </div>
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
