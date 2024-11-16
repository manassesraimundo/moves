'use client';

import React from 'react';
import styles from "./styles.module.css";

import NavBar from '../nav';
import Logo from '../logo';
import NavMobile from '../nav-mobile';

import { GiHamburgerMenu } from "react-icons/gi";

import { BannerProps } from '@/types/props';

import { BASE_URL_IMAGE } from '@/services/api';

const Header = ({ backgroundImage }: BannerProps) => {

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <>
      <header
        className={styles.header}
        style={{
          backgroundImage: `
        linear-gradient(to bottom, #1c253d7e, #141A29), 
        url(${BASE_URL_IMAGE}/${backgroundImage})
        `
        }}
      >

        <div className={styles.menu}>
          <div className={styles.containerLogo}>
            <Logo />
          </div>

          <NavBar />

          <div className={styles.buttonMenuMobile}>
            <GiHamburgerMenu color='#fff' size={24} onClick={() => setIsVisible(true)} />
          </div>
        </div>
      </header>

      {
        isVisible && (
          <NavMobile closeNavMobile={() => setIsVisible(false)} />
        )
      }
    </>
  )
}

export default Header