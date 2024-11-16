'use server'

import { api } from "./api";
import { Authores } from "@/types/author";
import { Movies } from "@/types/card";

const key = process.env.API_KEY;

const getMovies = async () => {
    try {
        const responseMovies = await api.get('/discover/movie', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultMovies: Movies[] = responseMovies.data.results
        return resultMovies;
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getMoviesPopular = async () => {
    try {
        const responseMovies = await api.get('/movie/popular', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultMovies: Movies[] = responseMovies.data.results
        return resultMovies
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getMoviesTopRated = async () => {
    try {
        const responseMovies = await api.get('/movie/top_rated', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultMovies: Movies[] = responseMovies.data.results
        return resultMovies
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getMoviesUpcoming = async () => {
    try {
        const responseMovies = await api.get('/movie/upcoming', {
            params: {
                api_key: key,
                language: 'pt-br',
                page: 1
            }
        });

        const resultMovies: Movies[] = responseMovies.data.results
        return resultMovies
    } catch (error) {
        console.log("Error: ", error)
    }
}

const getMovieDetails = async (id: string) => {
    try {
        const response = await api.get(`/movie/${id}`, {
            params: {
                api_key: key,
                language: 'pt-BR',
            },
        });
        const result: Movies = response.data;
        return result;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
    }
};

// Faz a requisição para o endpoint de pesquisa
const searchMovies = async (query: string, page?: number) => {
    try {
        const response = await api.get('/search/movie', {
            params: {
                api_key: key,    
                query: query,    
                language: 'pt-BR',
                page: page ?? 1
            },
        });

        const resultMovies: Movies[] = response.data.results
        return resultMovies
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

const getMoviesByPage = async (page: number, category: string) => {
    try {
        const response = await api.get(`/movie/${category}`, {
            params: {
                api_key: key,    
                language: 'pt-BR',
                page
            },
        });
        const resultMovies: Movies[] = response.data.results
        return resultMovies;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

const getCastMovie = async (id: string) => {
    try {
        const response = await api.get(`/movie/${id}/credits`, {
            params: {
                api_key: key,
                language: 'pt-BR',
            },
        });
        const result: Authores[] = response.data.cast;
        return result;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
    }
};

export {
    getMovies,
    getMoviesPopular,
    getMoviesTopRated,
    getMoviesUpcoming,
    getMovieDetails,
    searchMovies,
    getMoviesByPage,
    getCastMovie,
}