import axios from "axios";

const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    // method: 'get',
});

export { api, BASE_URL_IMAGE };