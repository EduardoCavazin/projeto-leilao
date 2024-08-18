import React, { useState } from "react";
import './Register.css';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputMask } from 'primereact/inputmask';
import { Divider } from "primereact/divider";

function Register() {
    const [completeName, setCompleteName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touchedFields, setTouchedFields] = useState({
        completeName: false,
        email: false,
        cpf: false,
        phone: false,
        username: false,
        password: false,
        confirmPassword: false
    });

    const handleBlur = (field) => {
        setTouchedFields({
            ...touchedFields,
            [field]: true
        });
    };

    const isFieldValid = (value) => {
        return value.trim().length > 0;
    };

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

    const isFormValid = () => {
        return (
            isFieldValid(completeName) &&
            isFieldValid(email) &&
            isFieldValid(cpf) &&
            isFieldValid(phone) &&
            isFieldValid(username) &&
            passwordValidation.upperCase &&
            passwordValidation.lowerCase &&
            passwordValidation.number &&
            passwordValidation.specialChar &&
            passwordValidation.minLength &&
            newPassword === confirmPassword
        );
    };

    const passFooter = (
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

    return (
        <div className="register-container">
            <Card title="Cadastro">
                <InputText
                    placeholder="Nome"
                    value={completeName}
                    onChange={(e) => setCompleteName(e.target.value)}
                    onBlur={() => handleBlur('completeName')}
                    className={touchedFields.completeName && !isFieldValid(completeName) ? 'p-invalid' : ''}
                />
                <InputText
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={touchedFields.email && !isFieldValid(email) ? 'p-invalid' : ''}
                />
                <InputMask
                    mask="999.999.999-99"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    onBlur={() => handleBlur('cpf')}
                    className={touchedFields.cpf && !isFieldValid(cpf) ? 'p-invalid' : ''}
                />
                <InputMask
                    mask="(99) 99999-9999"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={touchedFields.phone && !isFieldValid(phone) ? 'p-invalid' : ''}
                />
                <InputText
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => handleBlur('username')}
                    className={touchedFields.username && !isFieldValid(username) ? 'p-invalid' : ''}
                />
                <Password
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    footer={passFooter}
                    toggleMask
                />
                <Password
                    placeholder="Confirmar Nova Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    toggleMask
                    feedback={false}
                    className={touchedFields.confirmPassword && newPassword !== confirmPassword ? 'p-invalid' : ''}
                />
                <Button label="Cadastrar" disabled={!isFormValid()} />
            </Card>
        </div>
    );
}

export default Register;
