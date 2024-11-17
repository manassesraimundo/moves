'use client';

import React from "react";
import styles from "./page.module.css";

import { useSearchParams } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";

import { Movies, Tv } from "@/types/card";

import { searchMovies } from "@/services/services-movies";
import { searchTv } from "@/services/services-tv";
import CardList from "@/components/card-list";
import ButtonsChangePage from "@/components/buttons-change-page";

export default function SearchPage() {

  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [isLoading, setIsLoading] = React.useState(false);
  const [pageMovie, setPageMovie] = React.useState(1);
  const [pageTv, setPageTv] = React.useState(1);
  const [isActive, setIsActive] = React.useState({
    movies: true,
    tvs: false
  });

  const [resultMovies, setResultMovies] = React.useState<Movies[]>([]);
  const [resultTv, setResultTvs] = React.useState<Tv[]>([]);

  const toggolCategory = (intex: number) => {
    switch (intex) {
      case 1:
        setIsActive({
          movies: true,
          tvs: false
        });
        break;
      case 2:
        setIsActive({
          movies: false,
          tvs: true
        });
        break;
    }
  }

  const handlePageChange = async (page: number) => {
    if (page < 1) return;

    if (isActive.movies)
      setPageMovie(page);
    else
      setPageTv(page);
  };

  const resultSearch = async () => {
    setIsLoading(true);

    if (isActive.movies) {
      const movies = await searchMovies(query ?? '', pageMovie);
      if (movies)
        setResultMovies(movies);
    }
    else {
      const tvs = await searchTv(query ?? '', pageTv);
      if (tvs)
        setResultTvs(tvs);
    }

    setIsLoading(false);
  }

  React.useEffect(() => {
    resultSearch();
  }, [query, pageMovie, pageTv, isActive]);

  const banner = () => {
    for (let i = 0; i <= resultMovies.length; i++)
      if (resultMovies[i] && resultMovies[i].backdrop_path) return resultMovies[i].backdrop_path as string;
  }

  const bannerimage = banner();

  return (
    <>
      <Header backgroundImage={bannerimage} />

      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Resultado da pesquisa</h2>

          <div className={styles.buttons}>
            <button
              onClick={() => toggolCategory(1)}
              style={{ backgroundColor: `${isActive.movies ? 'rgba(255, 0, 0, 0.119)' : ''}` }}
            >Resultado para Filmes</button>
            <button
              onClick={() => toggolCategory(2)}
              style={{ backgroundColor: `${isActive.tvs ? 'rgba(255, 0, 0, 0.119)' : ''}` }}
            >Resultado para Séries</button>
          </div>
        </div>

        {
          isActive.movies && (
            <div style={{ padding: '12px' }}>
              <div className={styles.header}>
                <div className={styles.title2}>
                  <h2>Filmes</h2>
                </div>

                <ButtonsChangePage
                  page={pageMovie}
                  handlePageChange={handlePageChange}
                />
              </div>

              <CardList isLoadin={isLoading} list={resultMovies} />
            </div>
          )
        }

        {
          isActive.tvs && (
            <div style={{ padding: '12px' }}>
              <div className={styles.header}>
                <div className={styles.title2}>
                  <h2>Séries</h2>
                </div>

                <ButtonsChangePage
                  page={pageTv}
                  handlePageChange={handlePageChange}
                />
              </div>

              <CardList isLoadin={isLoading} list={resultTv} />
            </div>
          )
        }
      </div>

      <Footer backgroundImage={bannerimage} />
    </>
  );
}
