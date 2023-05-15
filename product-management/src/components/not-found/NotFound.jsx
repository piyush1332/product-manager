import React from 'react';
import Header from '../header/Header';
import Layout from '../layout/Layout';
import styles from './notFound.module.css';

function NotFound() {
    return (
        <>
            <Header />
            <Layout>
                <div className={styles.not_found}>Product does not exist</div>
            </Layout>
        </>
    )
}

export default NotFound;