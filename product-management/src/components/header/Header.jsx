import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './header.module.css';

function Header() {

    const navigate = useNavigate();

    return (
        <div className={style.header_parent}>
            <label onClick={() => navigate('/')}>
                Product Management
            </label>
        </div>
    )
}

export default Header;