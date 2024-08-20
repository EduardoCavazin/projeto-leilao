import React, { useRef } from "react";
import "./Header.css";
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from 'primereact/overlaypanel';
import Logout from '../../components/logout/Logout';


const Header = () => {
    const navigate = useNavigate();
    const op = useRef(null);

    const handleClick = (event) => {
        op.current.toggle(event);
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            onClick: () => navigate('/')
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    const end = [
        <Avatar icon="pi pi-user" shape="circle" onClick={handleClick} />,
    ];

    return (
        <div className="header">
            <Menubar model={items} end={end} />
            <OverlayPanel ref={op} style={{ width: '300px' }}>
                <div className="user-info">
                    <p>Usuário</p>
                    <Logout />
                </div>
            </OverlayPanel>
        </div>
    );
}

export default Header;