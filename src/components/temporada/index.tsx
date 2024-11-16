'use client';

import React from 'react';
import styles from "./styles.module.css";

import TemporadaCard from './temporada-card';
import AuthorCard from '../authores/authores-card';

import { TemporadaProps } from '@/types/props';

const Temporada = ({ seasons, number_of_seasons, authores }: TemporadaProps) => {
    
    const [temporada, setTemporada] = React.useState(true);
    const [isAuthores, setIsAuthores] = React.useState(false);

    const toggolCategory = (intex: number) => {
        switch (intex) {
            case 1:
                setTemporada(true);
                setIsAuthores(false);
                break;
            case 2:
                setTemporada(false);
                setIsAuthores(true);
                break;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <button
                    onClick={() => toggolCategory(1)}
                    style={{ backgroundColor: `${temporada ? 'rgba(255, 0, 0, 0.119)' : ''}` }}
                >Temporadas</button>

                <button
                    onClick={() => toggolCategory(2)}
                    style={{ backgroundColor: `${isAuthores ? 'rgba(255, 0, 0, 0.119)' : ''}` }}
                >Atores & Atrizes da Série</button>
            </div>

            {
                temporada && (
                    <>
                        <div className={styles.title}>
                            <h2>Temporadas - {number_of_seasons}</h2>
                        </div>

                        <div className={styles.list}>
                            {
                                seasons && seasons.map(tempo => (
                                    <TemporadaCard
                                        name={tempo.name}
                                        image={tempo.poster_path}
                                        episosio={tempo.episode_count}
                                        season_number={tempo.season_number}
                                    />
                                ))
                            }
                        </div>
                    </>
                )
            }

            {
                isAuthores && (
                    <>
                        <div className={styles.title}>
                            <h2>Atores <span>&</span> Atrizis da <span>Série</span></h2>
                        </div>

                        <div className={styles.list}>
                            {
                                authores.map(authore => (
                                    <AuthorCard
                                        name={authore.name}
                                        profile_path={authore.profile_path}
                                        character={authore.character}
                                    />
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Temporada