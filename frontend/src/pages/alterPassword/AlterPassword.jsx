import React, { useState } from "react";
import "./AlterPassword.css";
import { Card } from "primereact/card";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

function AlterPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            <p className="mt-2">Requisitos</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li className={passwordValidation.lowerCase ? "valid" : "invalid"}>Pelo menos uma letra minúscula</li>
                <li className={passwordValidation.upperCase ? "valid" : "invalid"}>Pelo menos uma letra maiúscula</li>
                <li className={passwordValidation.number ? "valid" : "invalid"}>Pelo menos um número</li>
                <li className={passwordValidation.specialChar ? "valid" : "invalid"}>Pelo menos um caractere especial</li>
                <li className={passwordValidation.minLength ? "valid" : "invalid"}>Mínimo de 6 caracteres</li>
            </ul>
        </>
    );

    const handleChangePassword = () => {
        // Lógica para alterar a senha
        console.log("Senha alterada com sucesso!");
    };

    return (
        <div className="alterPass-container">
            <Card title="Alterar Senha">
                <Password
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    footer={footer}
                    toggleMask
                />
                <Password
                    placeholder="Confirmar Nova Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                />
                <Button label="Alterar Senha" onClick={handleChangePassword} disabled={!isPasswordValid} />
            </Card>
        </div>
    );
}

export default AlterPassword;
