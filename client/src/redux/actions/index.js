import axios from "axios";

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const GET_VIDEOGAMES_NAME = "GET_VIDEOGAMES_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
///////////////////orders/////////////
export const VIDEOGAMES_ORDER_ABC = "VIDEOGAMES_ORDER_ABC";
export const VIDEOGAMES_ORDER_ZYX = "VIDEOGAMES_ORDER_ZYX";
export const VIDEOGAMES_ORDER_DESC = "VIDEOGAMES_ORDER_DESC";
export const VIDEOGAMES_ORDER_ASC = "VIDEOGAMES_ORDER_ASC";
export const VIDEOGAMES_BY_GENRE = "VIDEOGAMES_BY_GENRE";
export const VIDEOGAMES_BY_ORIGIN = "VIDEOGAMES_BY_ORIGIN";
/////////////////////loading//////////
export const LOADING = "LOADING";
export const CLEAR = "CLEAR"


const urlVG = "/videogames";
const urlG = "/genres";

export const getAllVideogames = () => (dispatch) => {
  dispatch(loading())//se queda cargando hasta cumplir el get de axios
  return axios.get(urlVG).then((response) =>
    dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: response.data,
    })
  );
};

export const getVideogame = (id) => (dispatch) => {
  return axios
    .get(`${urlVG}/${id}`) //return axios.get(`${urlVG}/${id}`)
    .then((response) =>
      dispatch({
        type: GET_VIDEOGAME,
        payload: response.data,
      })
    );
};

export const getVideogamesName = (name) => (dispatch) => {
  return axios.get(`${urlVG}?name=${name}`).then((response) =>
    dispatch({
      type: GET_VIDEOGAMES_NAME,
      payload: response.data,
    })
  );
};

export const getAllGenres = () => (dispatch) => {
  return axios.get(urlG).then((response) =>
    dispatch({
      type: GET_ALL_GENRES,
      payload: response.data,
    })
  );
};
/////////////////orders////////////////
export const getVideogamesOrderABC = () => {
  return {
    type: VIDEOGAMES_ORDER_ABC,
    payload: null,
  };
};

export const getVideogamesOrderZYX = () => {
  return {
    type: VIDEOGAMES_ORDER_ZYX,
    payload: null,
  };
};

export const getVideogamesDesc = () => {
  return {
    type: VIDEOGAMES_ORDER_DESC,
    payload: null,
  };
};

export const getVideogamesAsc = () => {
  return {
    type: VIDEOGAMES_ORDER_ASC,
    payload: null,
  };
};
////////////////////////filters////////

export const getVideogamesByGenre = (genre) => {
  return {
    type: VIDEOGAMES_BY_GENRE,
    payload: genre,
  };
};

export const getVideogamesByOrigin = (origin) => {
  return {
    type: VIDEOGAMES_BY_ORIGIN,
    payload: origin,
  };
};

///////LOADING/////////
export const loading = () => {
  return {
    type: LOADING,
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR,
  };
};