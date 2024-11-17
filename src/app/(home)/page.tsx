import styles from "./page.module.css";

import Link from "next/link";

import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchInput from "@/components/search-input";

import { FaPlus } from "react-icons/fa";

import { getMovies } from "@/services/services-movies";
import { getTv } from "@/services/services-tv";
import CardList from "@/components/card-list";

export default async function Home() {

  const movies = await getMovies();
  const tv = await getTv();

  function banner() {
    for (let i = 0; i <= movies?.length!; i++)
      if (movies && movies[i].backdrop_path) return movies[i].backdrop_path;
  }

  const bannerimage = banner();

  return (
    <>
      <Header backgroundImage={bannerimage} />

      <div className={styles.container}>
        <div className={styles.title}>
          <h2><span>Filmes</span> & Séries</h2>
        </div>

        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <SearchInput />
        </div>

        <div className={styles.title2}>
          <h2>Filmes</h2>
          <Link href={'/movies'}><FaPlus color="rgba(255, 0, 0, 0.4)" size={24} /> <span>Ver Mas</span></Link>
        </div>

        <CardList list={movies ? movies : []} />

        <div className={styles.title2}>
          <h2>Séries</h2>
          <Link href={'/tv'}><FaPlus color="rgba(255, 0, 0, 0.4)" size={24} /> <span>Ver Mas</span></Link>
        </div>

        <CardList list={tv ? tv : []} />
      </div>

      <Footer backgroundImage={bannerimage} />
    </>
  );
}
