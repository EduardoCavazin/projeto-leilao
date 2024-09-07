import React, { useState, useEffect } from 'react';
import style from './Profile.module.css';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const Profile = () => {
    const [user, setUser] = useState({});
    const [editedCompleteName, setEditedCompleteName] = useState('');
    const [editedUserName, setEditedUserName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedAddressNumber, setEditedAddressNumber] = useState('');
    const [editedCity, setEditedCity] = useState('');
    const [editedState, setEditedState] = useState('');
    const [editedComplement, setEditedComplement] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setEditedEmail(storedUser.email);
            setEditedPhone(storedUser.phone);
            setEditedAddress(storedUser.address || '');
            setEditedAddressNumber(storedUser.addressNumber || ''); // Inicializa o número da casa
            setEditedCity(storedUser.city || '');
            setEditedState(storedUser.state || '');
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
            message: 'Tem certeza de que deseja alterar o perfil?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Cancelar',
            accept: () => handleProfileEdit(),
            reject: () => console.log('Alteração cancelada')
        });
    };

    const changePassword = () => {
        confirmDialog({
            message: 'Foi enviado um email com link para alteração de senha.',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Cancelar',
            accept: () => console.log('Senha alterada'),
            reject: () => console.log('Alteração cancelada')
        });
    };

    const handleProfileEdit = () => {
        const updatedUser = { 
            ...user,
            completeName: editedCompleteName,
            userName: editedUserName,
            email: editedEmail, 
            phone: editedPhone,
            address: editedAddress,
            addressNumber: editedAddressNumber,
            city: editedCity,
            state: editedState,
            complement: editedComplement

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
                                <strong>Nome Completo</strong>
                                <InputText 
                                    value={editedCompleteName} 
                                    onChange={(e) => setEditedCompleteName(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>Nome de Usuário</strong>
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
                                <strong>Telefone</strong>
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
                                <strong>CEP</strong>
                                <InputMask 
                                    mask="99999-999" 
                                    onChange={handleCEPChange} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>Endereço</strong>
                                <InputText 
                                    value={editedAddress} 
                                    onChange={(e) => setEditedAddress(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>Número</strong>
                                <InputText 
                                    value={editedAddressNumber} 
                                    onChange={(e) => setEditedAddressNumber(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>Complemento</strong>
                                <InputText 
                                    value={editedComplement} 
                                    onChange={(e) => setEditedComplement(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>Cidade</strong>
                                <InputText 
                                    value={editedCity} 
                                    onChange={(e) => setEditedCity(e.target.value)} 
                                    className={style.itemText} 
                                />
                            </div>
                            <div className={style.detailItem}>
                                <strong>Estado</strong>
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
                            label="Alterar Senha" 
                            className="p-button-danger" 
                            text 
                            onClick={changePassword} 
                        />
                        <Button 
                            label="Editar Perfil" 
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
