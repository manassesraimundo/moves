import { Authores } from "./author"
import { Movies, Tv } from "./card"

export interface CardProps {
    id?: number
    title?: string
    name?: string
    overview?: string
    poster_path?: string
    backdrop_path?: string
    vote_average?: number
    isLoanding?: boolean
}

export interface CategoryProps {
    popular: Movies[] | Tv[]
    topRated: Movies[] | Tv[]
    upcoming: Movies[] | Tv[]
}

export interface BannerProps {
    backgroundImage?: string
}

export interface SeasonsProps {
    name?: string
    poster_path?: string
    season_number?: number
    episode_count?: number
}

export interface TemporadaProps {
    seasons?: SeasonsProps[]
    number_of_seasons?: number
    authores: Authores[]
}