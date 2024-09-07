import React, { useRef } from "react";
import style from "./Header.module.css";
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from 'primereact/overlaypanel';
import Logout from '../config/logout/Logout';
import { Button } from "primereact/button";

const Header = () => {
    const navigate = useNavigate();
    const op = useRef(null);

    const handleClick = (event) => {
        op.current.toggle(event);
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const nameUser = storedUser ? storedUser.completeName : 'Usuário';

    const items = [
        {
            key : 'home',
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                console.log('Home');
                navigate('/');
            }
        },
        {
            key : 'profile',
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    const end = [
        <Avatar 
            key='user-icon' 
            icon="pi pi-user" 
            shape="circle" 
            onClick={handleClick} 
        />,
    ];

    return (
        <div className={style.header}>
            <Menubar model={items} end={end} className={style.pMenubar} />
            <OverlayPanel ref={op} style={{ width: '300px' }}>
                <div className={style.userInfo}>
                    <p>{nameUser}</p>
                    <Button 
                        label="Perfil" 
                        onClick={() => navigate('/profile')} 
                        size="small" 
                    />
                    <Logout />
                </div>
            </OverlayPanel>
        </div>
    );
}

export default Header;
