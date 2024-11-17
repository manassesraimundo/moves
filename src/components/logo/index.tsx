import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const Logo = () => {
    return (
        <div className={styles.containerLogo}>
            <Link href={'/'}>
                <h1>Filmes <span>&</span> Séries</h1>
            </Link>
        </div>
    )
}

export default Logo;