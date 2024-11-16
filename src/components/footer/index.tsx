import React from 'react';
import styles from "./styles.module.css";

import Link from 'next/link';
import Logo from '../logo';

import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa6';

import { BannerProps } from '@/types/props';       

import { BASE_URL_IMAGE } from '@/services/api';

const Footer = ({ backgroundImage }: BannerProps) => {
    return (
        <footer
            className={styles.footer}
            style={{
                backgroundImage: `
                    linear-gradient(to top, #1c253db5, #141A29), 
                    url(${BASE_URL_IMAGE}/${backgroundImage})
                `
            }}
        >
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>

                    <div className={styles.context}>
                        <h6>Cartazes de Filmes & séries</h6>
                        <p><span>Filmes & séries -</span> Listagen de cartazes de filmes e séries</p>
                    </div>

                    <div className={styles.social}>
                        <Link href={'#'} className={styles.socialLink}>
                            <FaFacebook color='#ffffff60' size={24} />
                        </Link>

                        <Link href={'#'} className={styles.socialLink}>
                            <FaTwitter color='#ffffff60' size={24} />
                        </Link>

                        <Link href={'#'} className={styles.socialLink}>
                            <FaInstagram color='#ffffff60' size={24} />
                        </Link>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Link href={'/'} className={styles.button}>Ir ao inicio da pafina</Link>
                    <Link href={'#'} className={styles.button}>Contacto</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;