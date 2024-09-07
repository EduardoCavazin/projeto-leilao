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
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setEditedEmail(storedUser.email);
            setEditedPhone(storedUser.phone);
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
        const updatedUser = { ...user, email: editedEmail, phone: editedPhone };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Perfil atualizado:', updatedUser);
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

                    <div className={style.profileDetails}>
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
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
