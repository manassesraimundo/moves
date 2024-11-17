'use client';

import React from "react";
import styles from "./page.module.css";

import { useParams, useSearchParams } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";

import { getSeasonBanner, getSeasonEpisodes, getTvDetails } from "@/services/services-tv";

import { Episods, Tv } from "@/types/card";

export default function EpisodioPage() {

    const { id } = useParams();
    const searchParams = useSearchParams();
    const seasonNumber = searchParams.get('seasonNumber');

    const [episodios, setEpisodios] = React.useState<Episods[]>([]);
    const [dataSerie, setDataSerie] = React.useState<Tv>({});
    const [banner, setBanner] = React.useState('');

    const getDetails = async () => {
        const episo = await getSeasonEpisodes(Number(id), seasonNumber as string);
        const data = await getTvDetails(Number(id));
        const img = await getSeasonBanner(Number(id), seasonNumber as string) as string;

        setEpisodios(episo!);
        setDataSerie(data!);
        setBanner(img);
    }

    React.useEffect(() => {
        getDetails();
    }, [id]);

    return (
        <>
            <Header backgroundImage={banner} />

            <div className={styles.containerHeader}>
                <div className={styles.titleHeader}>
                    <h2>{dataSerie.name}</h2>
                </div>
            </div>

            <div className={styles.containerHeader}>
                <div className={styles.title}>
                    <h2>Episódios da temporada - {seasonNumber}</h2>
                </div>
            </div>

            <div className={styles.containeEp}>
                <div className={styles.episodios}>
                    {
                        episodios.map(epi => (
                            <p key={epi.id}>{epi.name}</p>
                        ))
                    }
                </div>
            </div>

            <Footer backgroundImage={banner} />
        </>
    )
}
