import React, { useState, useEffect } from 'react';
import style from './Profile.module.css';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [editedCompleteName, setEditedCompleteName] = useState('');
    const [editedUserName, setEditedUserName] = useState('');
    const [editedCpf, setEditedCPF] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedAddressNumber, setEditedAddressNumber] = useState('');
    const [editedCity, setEditedCity] = useState('');
    const [editedState, setEditedState] = useState('');
    const [editedComplement, setEditedComplement] = useState('');
    const [editedBairro, setEditedBairro] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setEditedCompleteName(storedUser.completeName);
            setEditedCPF(storedUser.cpf);
            setEditedUserName(storedUser.userName);
            setEditedEmail(storedUser.email);
            setEditedPhone(storedUser.phone);
            setEditedAddress(storedUser.address);
            setEditedAddressNumber(storedUser.addressNumber);
            setEditedCity(storedUser.city);
            setEditedState(storedUser.state);
            setEditedComplement(storedUser.complement);
            setEditedBairro(storedUser.bairro);
        }
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const confirmEdit = () => {
        confirmDialog({
            message: t('editMessage'),
            header: t('confirmation'),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: t('yes'),
            rejectLabel: t('cancel'),
            accept: () => handleProfileEdit(),
            reject: () => console.log('Alteração cancelada')
        });
    };

    const changePassword = () => {
        confirmDialog({
            message: t('verificationProfile'),
            header: t('confirmation'),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: t('yes'),
            rejectLabel: t('cancel'),
            accept: () => console.log('Senha alterada'),
            reject: () => console.log('Alteração cancelada')
        });
    };

    const handleProfileEdit = () => {
        const updatedUser = { 
            ...user,
            completeName: editedCompleteName,
            cpf: editedCpf,
            userName: editedUserName,
            email: editedEmail, 
            phone: editedPhone,
            address: editedAddress,
            addressNumber: editedAddressNumber,
            city: editedCity,
            state: editedState,
            complement: editedComplement,
            bairro: editedBairro
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Perfil atualizado:', updatedUser);
    };

    const getAddressFromCEP = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o endereço');
            }
            const data = await response.json();
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            setEditedAddress(data.logradouro || '');
            setEditedCity(data.localidade || '');
            setEditedState(data.uf || '');
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    };

    const handleCEPChange = async (e) => {
        const cep = e.target.value.replace(/\D/g, ''); 
        if (cep.length === 8) { 
            await getAddressFromCEP(cep);
        }
    };

    return (
        <div className={style.profileContainer}>
            <ConfirmDialog />             
            <div className={style.cardContainer}>
                <Card className={style.profileCard}>
                    <div className={style.profileHeader}>
                        <Avatar 
                            image={avatar || "https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"} 
                            size="xlarge" 
                            shape="circle" 
                            className={style.profileAvatar} 
                        />
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleAvatarChange} 
                            className={style.fileInput}
                        />
                        <div className={style.profileInfo}>
                            <h2>{user.completeName}</h2>
                            <p>CPF: {user.cpf}</p>
                        </div>
                    </div>

                    <Divider />

                    <div className={style.profileContent}>
                        <div className={style.profileDetails}>
                            <div className={style.detailItem}>
                                <strong>{t('completeName')}</strong>
                                <InputText 
                                    value={editedCompleteName} 
                                    onChange={(e) => setEditedCompleteName(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>CPF</strong>
                                <InputMask
                                    mask="999.999.999-99" 
                                    value={editedCpf} 
                                    onChange={(e) => setEditedCPF(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('username')}</strong>
                                <InputText 
                                    value={editedUserName} 
                                    onChange={(e) => setEditedUserName(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>E-Mail</strong>
                                <InputText 
                                    value={editedEmail} 
                                    onChange={(e) => setEditedEmail(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('phone')}</strong>
                                <InputMask 
                                    mask="(99) 99999-9999" 
                                    value={editedPhone} 
                                    onChange={(e) => setEditedPhone(e.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                        </div>
                        <Divider layout="vertical" />
                        <div className={style.addressDetails}>
                            <div className={style.detailItem}>
                                <strong>{t('cep')}</strong>
                                <InputMask 
                                    mask="99999-999" 
                                    onChange={handleCEPChange} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('adress')}</strong>
                                <InputText 
                                    value={editedAddress} 
                                    onChange={(e) => setEditedAddress(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('neighborhood')}</strong>
                                <InputText 
                                    value={editedBairro} 
                                    onChange={(e) => setEditedBairro(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('homeNumber')}</strong>
                                <InputText 
                                    value={editedAddressNumber} 
                                    onChange={(e) => setEditedAddressNumber(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('complement')}</strong>
                                <InputText 
                                    value={editedComplement} 
                                    onChange={(e) => setEditedComplement(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('city')}</strong>
                                <InputText 
                                    value={editedCity} 
                                    onChange={(e) => setEditedCity(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>{t('state')}</strong>
                                <InputText 
                                    value={editedState} 
                                    onChange={(e) => setEditedState(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className={style.profileFooter}>
                        <Button 
                            label={t('changePassword')} 
                            className="p-button-danger" 
                            text 
                            onClick={changePassword} 
                        />
                        <Button 
                            label={t('editProfile')}
                            className="p-button-primary" 
                            text 
                            onClick={confirmEdit} 
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
