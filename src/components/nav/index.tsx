'use client';

import React from 'react';
import styles from "./styles.module.css";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import SearchInput from '../search-input';

import { MdHome } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";

const NavBar = () => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <nav className={styles.nav}>
      <ul className={styles.listNav}>
        <li>
          <Link href={'/'}
            style={{ backgroundColor: `${pathname === '/' ? 'red' : ''}` }}
          ><MdHome color='#fff' size={24} /> <span>Início</span></Link>
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

      {
        pathname === '/search' && (
          <div style={{ maxWidth: 350 }}>
            <SearchInput defaultValue={query ?? ''} />
          </div>
        )
      }
    </nav>
  )
}

export default NavBar;