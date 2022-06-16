// Importa las actions types que necesites acá:
import {
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME,
  GET_VIDEOGAMES_NAME,
  GET_ALL_GENRES,
  /////////////ORDERS///////////
  VIDEOGAMES_ORDER_ABC,
  VIDEOGAMES_ORDER_ZYX,
  VIDEOGAMES_ORDER_DESC,
  VIDEOGAMES_ORDER_ASC,
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
    /////////////////ORDERS//////////////
    case VIDEOGAMES_ORDER_ABC:
      console.log(state.videogames[0].name + " "+ state.videogames[state.videogames.length-1].name );
      return {
        ...state,
        videogames: state.videogames.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }),
      };
    case VIDEOGAMES_ORDER_ZYX:
      return {
        ...state,
        videogames: state.videogames.sort(function (b, a) {
          //se cambian el orden de los parametros a y b
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }),
      };

    case VIDEOGAMES_ORDER_DESC:
      const gamesRatingDesc = state.videogames.sort(function (a, b) {
        return a.rating - b.rating;
      });
      return {
        ...state,
        videogames: gamesRatingDesc,
      };
    case VIDEOGAMES_ORDER_ASC:
      const gamesRatingAsc = state.videogames.sort(function (b, a) {
        return a.rating - b.rating;
      }); //se cambian a y b de orden
      return {
        ...state,
        videogames: gamesRatingAsc,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
