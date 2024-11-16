import styles from "./page.module.css";

import { Metadata } from "next";

import Category from "@/components/category";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchInput from "@/components/search-input";

import { getTvPopular, getTvTopRated, getTvOnTheAir } from "@/services/services-tv";

export const metadata: Metadata = {
  title: "Cartazes de séries",
  description: "Listagens de cartazes de séries",
};

export default async function TevPage() {

  const popular = await getTvPopular();
  const topRated = await getTvTopRated();
  const upcoming = await getTvOnTheAir();

  function banner () {
    for (let i = 0; i <= popular?.length!; i++)
      if (popular && popular[i].backdrop_path) return popular[i].backdrop_path as string;
  }

  const bannerimage = banner();

  return (
    <>
      <Header backgroundImage={bannerimage} />

      <div className={styles.container}>

        <div className={styles.title}>
          <h2>Séries</h2>
        </div>

        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <SearchInput />
        </div>

        <Category
          popular={popular!}
          topRated={topRated!}
          upcoming={upcoming!}
        />
      </div>

      <Footer backgroundImage={bannerimage} />
    </>
  );
}
