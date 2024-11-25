import React, { useState, useRef } from "react";
import style from './Register.module.css';
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputMask } from 'primereact/inputmask';
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import PersonService from "../../services/PersonSerice";

function Register() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useRef(null);
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
    const [isCpfValid, setIsCpfValid] = useState(true);

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
            newPassword === confirmPassword &&
            isCpfValid
        );
    };

    const passFooter = (
        <>
            <Divider />
            <p className="mt-2">{t('requirements')}</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li className={passwordValidation.lowerCase ? style.valid : style.invalid}>{t('lowerCase')}</li>
                <li className={passwordValidation.upperCase ? style.valid : style.invalid}>{t('upperCase')}</li>
                <li className={passwordValidation.number ? style.valid : style.invalid}>{t('number')}</li>
                <li className={passwordValidation.specialChar ? style.valid : style.invalid}>{t('specialChar')}</li>
                <li className={passwordValidation.minLength ? style.valid : style.invalid}>{t('minLength')}</li>
            </ul>
        </>
    );

    const storeUser = async () => {
        const user = {
            name: completeName,
            email,
            cpf,
            phoneNumber: phone,
            username,
            password: newPassword
        };

        try {
            const personService = new PersonService();
            await personService.register(user);

            
            toast.current.show({
                severity: 'success',
                summary: t('success'),
                detail: t('checkEmail'),
                life: 3000
            });

            setTimeout(() => {
                navigate('/login'); 
            }, 3000);
        } catch (error) {
            if (error.response?.data?.message) {
                toast.current.show({
                    severity: 'error',
                    summary: t('error'),
                    detail: error.response.data.message,
                    life: 5000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: t('error'),
                    detail: t('registerError'),
                    life: 5000
                });
            }
        }
    };

    const cpfTest = (cpfString) => {
        let sum;
        let remainder;
        sum = 0;

        if (cpfString === "00000000000") return false;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpfString.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpfString.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpfString.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpfString.substring(10, 11))) return false;

        return true;
    };

    const validateCPF = (e) => {
        const cpfValue = e.target.value.replace(/[^\d]/g, '');
        if (cpfTest(cpfValue)) {
            setIsCpfValid(true);
            setCpf(e.target.value);
        } else {
            setIsCpfValid(false);
        }
    };

    const validateEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    };

    return (
        <div className={style.registerContainer}>
            <Card title="Cadastro" className={style.cardContent}>
                <InputText
                    placeholder={t('name')}
                    value={completeName}
                    onChange={(e) => setCompleteName(e.target.value)}
                    onBlur={() => handleBlur('completeName')}
                    className={`${style['input-field']} ${touchedFields.completeName && !isFieldValid(completeName) ? 'p-invalid' : ''}`}
                />
                <InputText
                    placeholder={t('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`${style['input-field']} ${touchedFields.email && !/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email) ? 'p-invalid' : ''}`}
                />
                <InputMask
                    mask="999.999.999-99"
                    placeholder={t('cpf')}
                    value={cpf}
                    onChange={validateCPF}
                    onBlur={() => handleBlur('cpf')}
                    className={`${style['input-field']} ${touchedFields.cpf && !isCpfValid ? 'p-invalid' : ''}`}
                />
                <InputMask
                    mask="(99) 99999-9999"
                    placeholder={t('phone')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`${style['input-field']} ${touchedFields.phone && !isFieldValid(phone) ? 'p-invalid' : ''}`}
                />
                <InputText
                    placeholder={t('user')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => handleBlur('username')}
                    className={`${style['input-field']} ${touchedFields.username && !isFieldValid(username) ? 'p-invalid' : ''}`}
                />
                <Password
                    placeholder={t('password')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    footer={passFooter}
                    toggleMask
                    className={style['input-field']}
                />
                <Password
                    placeholder={t('confirmPassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    toggleMask
                    feedback={false}
                    className={`${style['input-field']} ${touchedFields.confirmPassword && newPassword !== confirmPassword ? 'p-invalid' : ''}`}
                />
                <Toast ref={toast}/>
                <Button
                    label={t('register')}
                    disabled={!isFormValid()}
                    className={style['button']}
                    onClick={storeUser}
                />
            </Card>
        </div>
    );
}

export default Register;
