'use client';

import React from "react";
import styles from "./page.module.css";

import { useParams } from "next/navigation";

import Authore from "@/components/authores";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { getCastMovie, getMovieDetails } from "@/services/services-movies";
import { BASE_URL_IMAGE } from "@/services/api";

import { Movies } from "@/types/card";
import { Authores } from "@/types/author";

import StarRatings from 'react-star-ratings';
import LoadingPage from "@/components/skeleton/loading-page";

export default function DetalisMoviesPage() {
    const { id } = useParams();

    const [movie, setMovie] = React.useState<Movies>({});
    const [authores, setAuthores] = React.useState<Authores[]>([]);
    const [isLoading, setIsloading] = React.useState(false);

    const getDetails = async () => {
        try {
            setIsloading(true);

            const resultMovie = await getMovieDetails(Number(id));
            const authores = await getCastMovie(Number(id));

            if (resultMovie)
                setMovie(resultMovie);

            if (authores)
                setAuthores(authores);

        } catch (error) {
            console.error(error)
        } finally {
            setIsloading(false)
        }
    }

    React.useEffect(() => {
        getDetails();
    }, [id]);

    return (
        <>
            <Header backgroundImage={movie.backdrop_path} />

            <div className={styles.containerHeader}>
                <div className={styles.titleHeader}>
                    <h2>Detalhes do <span>Filme</span></h2>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.image}>
                    {
                        isLoading ?
                            <LoadingPage />
                            :
                            movie.poster_path ?
                                <img src={`${BASE_URL_IMAGE}/${movie.poster_path}`} alt={movie.title} />
                                :
                                <img src={"/cover.png"} alt={movie.title} />
                    }
                </div>

                <div className={styles.containerInfo}>
                    <div className={styles.title}>
                        <h2>{movie.title}</h2>
                        {
                            movie.original_title && (
                                <h3>Titulo original: {movie.original_title}</h3>
                            )
                        }
                        <span>{movie.tagline}</span>
                    </div>

                    <div className={styles.description}>
                        <p>{movie.overview}</p>
                    </div>

                    <div className={styles.genero}>
                        <h5>Gênero</h5>
                        <div className={styles.generoItem}>
                            {
                                movie.genres && movie.genres?.map(genere => (
                                    <p key={genere.id}>{genere.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.info}>
                        <div>
                            <p className={styles.year}>Avaliação</p>
                            {
                                movie.vote_average?.toFixed(1) && (
                                    <StarRatings
                                        rating={parseFloat(movie.vote_average?.toFixed(1))}
                                        starRatedColor="#ffd700"
                                        numberOfStars={10}
                                        name="rating"
                                        starDimension="20px"
                                        starSpacing="3px"
                                    />
                                )
                            }
                            <p>{movie.vote_average?.toFixed(1)}</p>
                        </div>

                        <div>
                            <p className={styles.year}>Ano de laçamento</p>
                            <p>{movie.release_date}</p>
                        </div>
                    </div>

                    {
                        movie.homepage && (
                            <div className={styles.link}>
                                <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                                    Ver o site
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>

            <Authore authores={authores} />

            <Footer backgroundImage={movie.backdrop_path} />
        </>
    )
}
