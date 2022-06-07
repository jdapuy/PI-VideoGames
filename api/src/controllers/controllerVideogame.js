//funciones
require('dotenv').config();
const {
    API_KEY
  } = process.env;
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { Videogame, Genre } = require('../db.js');

const axios = require("axios")
//sequelize para las consultas en la base de datos

const genresByNames = (genres)=>{
    const genresNames = genres.map((g)=> g.name)
    return genresNames;
}

const videogamesAPI = async ()=>{ // Envio todos los viedojuegos filtados por id,name,backgroun y generos de la API
    const vgAPI = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let videoGamesArray = vgAPI.data.results.map((vg)=>{
        return {
            id: vg.id,
            name: vg.name,
            background_image: vg.background_image,
            genres:genresByNames(vg.genres),
        }
    })
    return videoGamesArray;
}

const videogamesBD = async ()=>{ //trae los videojuegos de la base de datos filtrados por id,name y imagen
    const infoBD = await Videogame.findAll();
    let videoGamesArray = infoBD.map((vg)=>{
        return {
            id: vg.id,
            name: vg.name,
            background_image: vg.background_image
        }
    })
    return videoGamesArray;
}

const getVideogames = async (req,res,next) => {
    try {
        let gamesAPI = await videogamesAPI();
        let gamesBD = await videogamesBD();
       
        if(gamesBD.length < 1){
            res.send(gamesAPI)
        }else{
            const mergeAPI_BD = [...gamesAPI, ...gamesBD];
            res.send(mergeAPI_BD)
        }
        
    } catch (error) {
        next(error) //no se rompe toda la aplicacion con un error, continua y muestra el error
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

const crearVG = async(req,res,next)=>{
    const {videogame, genres} = req.body;
    if(videogame){ //si videogame existe
        if(!videogame.name|| !videogame.description || videogame.platforms.length<1){
            res.send("Propiedades faltantes")
        }
        try {
            const newVideoGame = await Videogame.create(videogame);
            genres.forEach(async(genre) => { //recorre el array de generos del form
                let genreExist = await Genre.findOne({ where: { name: genre } });
                if(genreExist){//si en bd existe el genero
                    console.log(genreExist.dataValues.id);
                    let idGenre = genreExist.dataValues.id //sacamos el id del genero encontrado
                 await newVideoGame.addGenre(idGenre) //se le agrega el id del genero a videogame
                }else{res.send(`genero: ${genre} inexistente`)}
            });
            res.send("Se ha creado un videogame");
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = { getVideogames, crearVG };
