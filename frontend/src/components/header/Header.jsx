import React, { useRef } from "react";
import "./Header.css";
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from 'primereact/overlaypanel';
import Logout from '../config/logout/Logout';
import { Button } from "primereact/button";


const Header = () => {
    const navigate = useNavigate();
    const op = useRef(null);
    const userName = localStorage.getItem('userEmail');

    const handleClick = (event) => {
        op.current.toggle(event);
    }

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
        <Avatar key='user-icon' icon="pi pi-user" shape="circle" onClick={handleClick} />,
    ];

    return (
        <div className="header">
            <Menubar model={items} end={end} />
            <OverlayPanel ref={op} style={{ width: '300px' }}>
                <div className="user-info">
                    <p>{userName}</p>
                    <Button label="Perfil" onClick={() => navigate('/profile')} />
                    <Logout />
                </div>
            </OverlayPanel>
        </div>
    );
}

export default Header;