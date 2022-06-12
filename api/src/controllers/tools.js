require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { Videogame, Genre } = require("../db.js");

const consultaAPI = async () => {
  let games = [];
  let endpoints = [];
  let api;
  let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

  for (let i = 1; i < 6; i++) {
    api = await axios.get(url);
    url = api.data.next;
    games = [...games, ...api.data.results];
  }
  console.log(`Se han cargado los ${games.length} videogames`);
  return games;

  // //creacion de endpoints //INTENTO CON PROMESAS CONSULTAR
  //  for(let i = 1; i<6; i++){
  //   url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
  //   endpoints = [...endpoints,url]
  // }

  // let promArray =endpoints.map((endpoint) =>  axios.get(endpoint)
  // .then((response)=>response.data)
  // .then(data=>{  console.log(data.results.length); return data.results}))

  // let getGames = Promise.all(promArray)
  // .then((games)=> {console.log(games[0].length); return  games[0]})
  // .catch(reason=>console.log(reason))
  
  // return getGames;


};

const videogamesAPI = async (name) => {
  // Envio todos los viedojuegos
  const vgAPI = await consultaAPI();

  if (name) {
    // si llega name por query
    let gamesFilter = vgAPI
      .filter((vg) => vg.name.toLowerCase().includes(name.toLowerCase())) //el tolowercase lo uso para que sea case insensitive
      .map((vg) => {
        return {
          id: vg.id,
          name: vg.name,
          background_image: vg.background_image,
          genres: vg.genres.map((g) => g.name),
        };
      });

    return gamesFilter;
  } else {
    let videoGamesArray = vgAPI.map((vg) => {
      return {
        id: vg.id,
        name: vg.name,
        background_image: vg.background_image,
        genres: vg.genres.map((g) => g.name),
      };
    });
    return videoGamesArray;
  }
};

const videogamesBD = async (name) => {
  //trae los videojuegos de la base de datos

  if (name) {
    //filtrado por name
    var infoBD = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
   
  } else {
    //envia todos los videogames
    var infoBD = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    
  }
  let videoGamesArray = infoBD.map((vg) => {
    return {
      id: vg.id,
      name: vg.name,
      background_image: vg.background_image,
      genres: vg.genres.map((g) => g.name),
    };
  });
  return videoGamesArray;
};

////////////////por ID////////////////

const videogamesAPIId = async (idVideogame) => {
  try {
    const get = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
    );
    const vgFound = get.data;
    if (vgFound) {
      return {
        id: vgFound.id,
        name: vgFound.name,
        description: vgFound.description,
        released: vgFound.released,
        rating: vgFound.rating,
        platforms: vgFound.platforms.map((p) => p.platform.name),
        background_image: vgFound.background_image,
        genres: vgFound.genres.map((g) => g.name),
      };
    } else {
      console.log(`id ${idVideogame} no encontrado en la API`);
    }
  } catch (error) {
    console.log(`id ${idVideogame} no encontrado en la API`);
  }
};

const videogamesBDId = async (idVideogame) => {
  try {
    let infoBD = await Videogame.findByPk(idVideogame, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (infoBD) {
      return {
        id: infoBD.id,
        name: infoBD.name,
        description: infoBD.description,
        released: infoBD.released,
        rating: infoBD.rating,
        platforms: infoBD.platforms,
        background_image: infoBD.background_image,
        genres: infoBD.genres.map((g) => g.name),
      };
    } else {
      console.log(`id ${idVideogame} no encontrado en la Base de datos`);
    }
  } catch (error) {
    console.log(`id ${idVideogame} no encontrado en la Base de datos`);
  }
};

module.exports = {
  videogamesAPI,
  videogamesBD,
  videogamesAPIId,
  videogamesBDId,
};
