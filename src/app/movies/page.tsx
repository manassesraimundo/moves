import styles from "./page.module.css";

import { Metadata } from "next";

import Category from "@/components/category";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchInput from "@/components/search-input";

import { getMoviesPopular, getMoviesTopRated, getMoviesUpcoming } from "@/services/services-movies";

export const metadata: Metadata = {
  title: "Cartazes de filmes",
  description: "Listagens de cartazes de filmes"
};

export default async function MoviePage() {

  const popular = await getMoviesPopular();
  const topRated = await getMoviesTopRated();
  const upcoming = await getMoviesUpcoming();

  const banner = () => {
    for (let i = 0; i <= popular?.length!; i++)
      if (popular && popular[i].backdrop_path) return popular[i].backdrop_path as string;
  }

  const bannerimage = banner();

  return (
    <>
      <Header backgroundImage={bannerimage} />

      <div className={styles.container}>

        <div className={styles.title}>
          <h2>Filmes</h2>
        </div>

        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <SearchInput />
        </div>

        <Category
          popular={popular ? popular : []}
          topRated={topRated ? topRated : []}
          upcoming={upcoming ? upcoming : []}
        />
      </div>

      <Footer backgroundImage={bannerimage} />
    </>
  );
}
