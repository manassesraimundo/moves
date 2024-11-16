import axios from "axios";

const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original';

const api: any = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export { api, BASE_URL_IMAGE };