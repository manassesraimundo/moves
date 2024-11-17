'use client';

import React from "react";
import styles from "./page.module.css";

import { useParams } from "next/navigation"

import Footer from "@/components/footer";
import Header from "@/components/header";
import Temporada from "@/components/temporada";

import { getCastTv, getTvDetails } from "@/services/services-tv";
import { BASE_URL_IMAGE } from "@/services/api";

import { Tv } from "@/types/card";
import { Authores } from "@/types/author";

import StarRatings from 'react-star-ratings';
import LoadingPage from "@/components/skeleton/loading-page";

export default function DetalisMoviesPage() {
    const { id } = useParams();

    const [tv, setTv] = React.useState<Tv>({});
    const [authores, setAuthores] = React.useState<Authores[]>([]);
    const [isLoading, setIsloading] = React.useState(false);

    const getDetails = async () => {
        try {
            setIsloading(true);

            const resultTv = await getTvDetails(Number(id));
            const authores = await getCastTv(Number(id));

            if (resultTv)
                setTv(resultTv);
            if (authores)
                setAuthores(authores);

        } catch (error) {
            console.error(error);
        } finally {
            setIsloading(false);
        }
    }

    React.useEffect(() => {
        getDetails();
    }, [id]);

    return (
        <>
            <Header backgroundImage={tv.backdrop_path!} />

            <div className={styles.containerHeader}>
                <div className={styles.titleHeader}>
                    <h2>Detalhes da <span>Série</span></h2>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.image}>
                    {
                        isLoading ?
                            <LoadingPage />
                            :
                            tv.poster_path ?
                                <img src={`${BASE_URL_IMAGE}/${tv.poster_path}`} alt={tv.name} />
                                :
                                <img src={"/cover.png"} alt={tv.name} />
                    }
                </div>

                <div className={styles.containerInfo}>
                    <div className={styles.title}>
                        <h2>{tv.name}</h2>
                        {
                            tv.original_name && (
                                <h3>Titulo original: {tv.original_name}</h3>
                            )
                        }
                        <span>{tv.tagline}</span>
                    </div>

                    <div className={styles.description}>
                        <p>{tv.overview}</p>
                    </div>

                    <div className={styles.genero}>
                        <h5>Gênero</h5>
                        <div className={styles.generoItem}>
                            {
                                tv.genres && tv.genres.map(genre => (
                                    <p key={genre.id}>{genre.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.info}>
                        <div>
                            <p className={styles.year}>Avaliação</p>
                            {
                                tv.vote_average?.toFixed(1) && (
                                    <StarRatings
                                        rating={parseFloat(tv.vote_average?.toFixed(1))}
                                        starRatedColor="#ffd700"
                                        numberOfStars={10}
                                        name="rating"
                                        starDimension="20px"
                                        starSpacing="3px"
                                    />
                                )
                            }
                            <p>{tv.vote_average?.toFixed(1)}</p>
                        </div>
                        <div>
                            <p className={styles.year}>Ano de laçamento</p>
                            <p>{tv.first_air_date}</p>
                        </div>
                    </div>

                    {
                        tv.homepage && (
                            <div className={styles.link}>
                                <a href={tv.homepage} target="_blank" rel="noopener noreferrer">
                                    Ver o site
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>

            <Temporada seasons={tv.seasons} number_of_seasons={tv.number_of_seasons}
                authores={authores}
            />

            <Footer backgroundImage={tv.backdrop_path!} />
        </>
    )
}
