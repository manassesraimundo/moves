
export interface Movies {
    id?: number
    title?: string
    overview?: string
    poster_path?: string
    backdrop_path?: string
    vote_average?: number
    release_date?: string
    original_title?: string
    tagline?: string
    genres?: Genre[]
    homepage?: string
}

export interface Genre {
    id: number
    name?: string
}

export interface Tv {
    id?: number
    name?: string
    original_name?: string
    overview?: string
    backdrop_path?: string
    poster_path?: string
    first_air_date?: string
    homepage?: string
    tagline?: string
    vote_average?: number
    number_of_seasons?: number
    genres?: Genre[]
    seasons?: []
}

export interface Episods {
    id: number
    name?: string
}