'use client';

import React from 'react';
import styles from "./styles.module.css";

import { useParams, useRouter } from 'next/navigation';

import { BASE_URL_IMAGE } from '@/services/api';

type TemporadaCardProps = {
  name?: string
  image?: string
  episosio?: number
  season_number?: number
}

const TemporadaCard = ({ name, image, episosio, season_number }: TemporadaCardProps) => {

  const router = useRouter();
  const { id } = useParams();

  const navigate = () => {
    router.push(`/details-tv/${id}/episodio?seasonNumber=${season_number}`)
  }

  return (
    <div className={styles.cardTemporada} onClick={navigate}>
      <div className={styles.tempo}>
        <h2>{name}</h2>
        <p>Ep-{episosio}</p>
      </div>

      <div className={styles.image}>
        {
          image ?
            <img src={`${BASE_URL_IMAGE}/${image}`} alt={name} />
            :
            <img src={"/cover.png"} alt={name} />
        }
      </div>
    </div>
  )
}

export default TemporadaCard;