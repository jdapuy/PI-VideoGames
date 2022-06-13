// Importa las actions types que necesites acá:
import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME,
  GET_VIDEOGAMES_NAME,
  GET_ALL_GENRES,
} from "../actions";

const initialState = {
  videogames: [],
  videogame: {},
  genres: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
          return {
            ...state,
            videogames: action.payload,
          };
          case GET_VIDEOGAMES_NAME:
          return {
            ...state,
            videogames: action.payload,
          };
      
        case GET_VIDEOGAME:
          return {
            ...state,
            videogame: action.payload,
          };
        case GET_ALL_GENRES:
          return {
            ...state,
            genres: action.payload,
          };
          default:
            return {...state};
      }

};

export default rootReducer;
