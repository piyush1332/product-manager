import React from 'react';
import styles from './alert.module.css';

function Alert(props) {
    return (
        <div className={styles.alert_holder}>
            {props?.message}
        </div>
    )
}

export default Alert;