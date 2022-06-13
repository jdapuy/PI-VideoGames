import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_VIDEOGAMES_NAME = "GET_VIDEOGAMES_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";



const urlVG = "http://localhost:3001/videogames";
const urlG = "http://localhost:3001/genres";


export const getAllVideogames = () => (dispatch) => {
    return axios.get(urlVG)
    .then((response) => dispatch({
        type: GET_ALL_VIDEOGAMES, payload:  response.data }));
};

export const getVideogame = (id) => (dispatch) => {
    return axios.get(`${urlVG}/${id}`)   //return axios.get(`${urlVG}/${id}`)
    .then((response) => dispatch({
         type: GET_VIDEOGAME, payload:  response.data }));
};

export const getVideogamesName = (name) => (dispatch) => {
    return axios.get(`${urlVG}?name=${name}`)
    .then((response) => dispatch({
         type: GET_VIDEOGAMES_NAME, payload:  response.data }));
};



export const getAllGenres = () => (dispatch) => {
    return axios.get(urlG)
    .then((response) => dispatch({
        type: GET_ALL_GENRES, payload:  response.data }));
};