import React from 'react';
import style from './layout.module.css';

function Layout(props) {
    return (
        <div className={style.layout_parent}>
            {props.children}
        </div>
    )
}

export default Layout;