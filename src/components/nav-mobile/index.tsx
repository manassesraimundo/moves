'use client';

import React from 'react';
import styles from './styles.module.css';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import SearchInput from '../search-input';
import Logo from '../logo';

import { MdHome } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { IoClose } from "react-icons/io5";

type NavMobileProps = {
    closeNavMobile?: () => void
}

const NavMobile = ({ closeNavMobile }: NavMobileProps) => {
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div className={styles.containerNavMobile}>
            <div className={styles.header}>
                <div className={styles.image}>
                    <Logo />
                </div>

                <IoClose color='#f50303' size={26} onClick={() => closeNavMobile && closeNavMobile()} />
            </div>

            <ul>
                <li>
                    <Link href={'/'}
                        style={{ backgroundColor: `${pathname === '/' ? 'red' : ''}` }}
                    ><MdHome color='#fff' size={24} /> <span>Home</span></Link>
                </li>
                <li>
                    <Link href={'/movies'}
                        style={{ backgroundColor: `${pathname === '/movies' ? 'red' : ''}` }}
                    ><MdLocalMovies color='#fff' size={24} /> <span>Filmes</span></Link>
                </li>
                <li>
                    <Link href={'/tv'}
                        style={{ backgroundColor: `${pathname === '/tv' ? 'red' : ''}` }}
                    ><MdLiveTv color='#fff' size={24} /> <span>Séries</span></Link>
                </li>
            </ul>

            <div className={styles.inputDiv}>
                <SearchInput hideOnSearch defaultValue={`${pathname === '/search' ? query : ''}`} />
            </div>
        </div>
    )
}

export default NavMobile;