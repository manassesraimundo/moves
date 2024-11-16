import React from 'react';
import styles from "./styles.module.css";

import Link from 'next/link';

import SkeletonCard from '../skeleton/skeleton-card';

import { FaStar } from 'react-icons/fa';

import { CardProps } from '@/types/props';

import { BASE_URL_IMAGE } from '@/services/api';

const Card = ({
    id,
    title,
    name,
    overview,
    poster_path,
    vote_average,
    isLoanding
}: CardProps) => {

    if (isLoanding) return <SkeletonCard />

    return (
        <div className={styles.card}>
            {
                poster_path ?
                    <img src={`${BASE_URL_IMAGE}/${poster_path as string}`} alt={title ? title : name} />
                    :
                    <img src={"/cover.png"} alt={title ? title : name} />
            }

            <div className={styles.detalhe}>
                <div className={styles.title}>
                    <h4>{title ? title : name}</h4>
                </div>

                <div className={`${overview && styles.description}`}>
                    <p>{overview}</p>
                </div>
            </div>

            <div className={styles.votos}>
                <FaStar size={18} color="#ffd700" />
                <p>{vote_average?.toFixed(1)}</p>
            </div>

            <div className={styles.buttonDetalhes}>
                {
                    title ? <Link href={`details-movies/${id}`}>Ver detalha</Link> : <Link href={`details-tv/${id}`}>Ver detalha</Link>
                }
            </div>
        </div>
    )
}

export default Card;