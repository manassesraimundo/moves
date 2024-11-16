'use client';

import React from 'react';
import styles from "./styles.module.css";

import { usePathname } from 'next/navigation';

import PaginationButtons from './buttons';
import CardList from '../card-list';

import { CategoryProps } from '@/types/props';

import { getMoviesByPage } from '@/services/services-movies';
import { getTvByPage } from '@/services/services-tv';

const Category = ({ popular, topRated, upcoming }: CategoryProps) => {

    const pathname = usePathname();
    
    const [isLoading, setIsLoading] = React.useState(false);
    const [isActive, setIsActive] = React.useState({
        popular: true,
        topRated: false,
        estreia: false
    });
    const [pagination, setPagenation] = React.useState({
        popular: 2,
        topRated: 2,
        estreia: 2
    });
    const [topRatedList, setTopRatedList] = React.useState(topRated);
    const [upcomingList, setUpcomingList] = React.useState(upcoming);
    const [popularList, setPopularList] = React.useState(popular);

    const toggolCategory = (intex: number) => {
        switch (intex) {
            case 1:
                setIsActive({
                    popular: true,
                    topRated: false,
                    estreia: false
                });
                break;
            case 2:
                setIsActive({
                    popular: false,
                    topRated: true,
                    estreia: false
                });
                break;
            case 3:
                setIsActive({
                    popular: false,
                    topRated: false,
                    estreia: true
                });
                break;
        }
    }

    const PageChange = async (newPage: number, category: string) => {
        setIsLoading(true);

        if (pathname === '/movies') {
            const result = await getMoviesByPage(newPage, category);

            if (category === 'popular')
                setPopularList(result!);
            else if (category === 'top_rated')
                setTopRatedList(result!);
            else if (category === 'upcoming')
                setUpcomingList(result!);
        }

        if (pathname === '/tv') {
            const resultTv = await getTvByPage(newPage, category)

            if (category === 'popular')
                setPopularList(resultTv!);
            else if (category === 'top_rated')
                setTopRatedList(resultTv!);
            else if (category === 'on_the_air')
                setUpcomingList(resultTv!);
        }

        setIsLoading(false);
    };

    const handlePageChange = (page: number, category: string) => {
        if (page === 0) return;

        switch (category) {
            case 'popular':
                setPagenation({
                    popular: page,
                    topRated: pagination.topRated,
                    estreia: pagination.estreia
                });
                PageChange(pagination.popular, category);
                break;
            case 'top_rated':
                setPagenation({
                    popular: pagination.popular,
                    topRated: page,
                    estreia: pagination.estreia
                });
                PageChange(pagination.topRated, category);
                break;
            case 'upcoming':
            case 'on_the_air':
                setPagenation({
                    popular: pagination.popular,
                    topRated: pagination.topRated,
                    estreia: page
                });
                PageChange(pagination.estreia, category);
                break;
        }
    }

    return (
        <>
            <div className={styles.category}>
                <div>
                    <button
                        onClick={() => toggolCategory(1)}
                        style={{ backgroundColor: `${isActive.popular ? '#141A29' : ''}` }}
                    >Popular</button>
                    <button
                        onClick={() => toggolCategory(2)}
                        style={{ backgroundColor: `${isActive.topRated ? '#141A29' : ''}` }}
                    >Mas votados</button>
                    <button
                        onClick={() => toggolCategory(3)}
                        style={{ backgroundColor: `${isActive.estreia ? '#141A29' : ''}` }}
                    >{pathname === '/movies' ? 'Laçamentos' : 'Em Exibição'}</button>
                </div>
            </div>

            {
                isActive.popular && (
                    <div style={{ padding: '12px' }}>
                        <div className={styles.title}>
                            <h2><span>{pathname === '/movies' ? 'Filmes' : 'Séries'}</span> Populares</h2>

                            <PaginationButtons
                                currentPage={pagination.popular}
                                category="popular"
                                handlePageChange={handlePageChange}
                            />
                        </div>
                        <CardList 
                            list={popularList}
                            isLoadin={isLoading}
                        />
                    </div>
                )
            }

            {
                isActive.topRated && (
                    <div style={{ padding: '12px' }}>
                        <div className={styles.title}>
                            <h2><span>{pathname === '/movies' ? 'Filmes' : 'Séries'}</span> Mas Votados</h2>

                            <PaginationButtons
                                currentPage={pagination.topRated}
                                category="top_rated"
                                handlePageChange={handlePageChange}
                            />
                        </div>
                        <CardList 
                            list={topRatedList}
                            isLoadin={isLoading}
                        />
                    </div>
                )
            }

            {
                isActive.estreia && (
                    <div style={{ padding: '12px' }}>
                        <div className={styles.title}>
                            <h2><span>{pathname === '/movies' ? 'Filmes' : 'Séries'}</span> {pathname === '/movies' ? 'para o Laçamento' : 'em Exibição'}</h2>

                            <PaginationButtons
                                currentPage={pagination.estreia}
                                category={pathname === '/movies' ? "upcoming" : "on_the_air"}
                                handlePageChange={handlePageChange}
                            />
                        </div>
                        <CardList 
                            list={upcomingList}
                            isLoadin={isLoading}
                        />
                    </div>
                )
            }
        </>
    )
}

export default Category;