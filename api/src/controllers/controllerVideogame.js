const { Videogame, Genre } = require("../db.js");
//funciones
const {
  videogamesAPI,
  videogamesBD,
  videogamesAPIId,
  videogamesBDId,
} = require("./tools");

//__GET /videogames__:
const getVideogames = async (req, res, next) => {
  const { name } = req.query;

  try {
    let gamesAPI = await videogamesAPI(name);
    let gamesBD = await videogamesBD(name);
    if (gamesBD.length < 1 && gamesAPI.length < 1) {
      res.status(404).send("videogames solicitados no encontrados");
    } else {
      const mergeAPI_BD = [...gamesAPI, ...gamesBD];
      if (name) {
        res.send(mergeAPI_BD.slice(0, 15));
      } else {
        res.send(mergeAPI_BD);
      }
    }
  } catch (error) {
    next(error); //no se rompe toda la aplicacion con un error, continua y muestra el error
  }
};
////__GET /videogames/:id
const getVideogamesId = async (req, res, next) => {
  const { idVideogame } = req.params;

  try {

    let gameAPI = await videogamesAPIId(idVideogame);
    let gamesBD = await videogamesBDId(idVideogame);
    let id = parseInt(idVideogame)
    if (gameAPI && !isNaN(id) ) { //typeof valida que solo sean numbers, no se ingresan names
      return res.send(gameAPI);
    } else if (gamesBD) {
      return res.send(gamesBD);
    } else {
      res.status(404).send(`Videogame id ${idVideogame} no encontrado`);
    }
  } catch (error) {
    next(error); //no se rompe toda la aplicacion con un error, continua y muestra el error
  }
};

//COMO DEBE VENIR EL VIDEOGAME POR BODY del formulario
// ejemplo{
//     "videogame":{
//         "name":"minecraft",
//         "description": "Descripción",
//         "released": "2013-09-17",
//         "rating": 4.48,
//         "platforms": ["pc","play1","xbox"],
//         "background_image": "url"
//     },
//     "genres":["Action","Indie","Arcade"]
// }

const crearVG = async (req, res, next) => {
  const { videogame, genres } = req.body;

  if (videogame) {
    //si videogame existe
    if (
      !videogame.name ||
      !videogame.description ||
      videogame.platforms.length < 1
    ) {
      res.send("Propiedades faltantes");
    }
 
    try {
      const newVideoGame = await Videogame.create(videogame);

      let genresBD = await Genre.findAll({ where: { name: genres } });
      let genresValidos = genresBD.map(g=>genres.includes(g.dataValues.name)); //crea una array con trues si existen los generos recibidos
      if(genresValidos.length == genres.length){ //si hay algun genre invalido no ingresa
        await newVideoGame.addGenre(genresBD);
        res.send("Se ha creado un videogame");
      }else{
        res.send("generos ingresados invalidos");
      }
    
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { getVideogames, crearVG, getVideogamesId };
