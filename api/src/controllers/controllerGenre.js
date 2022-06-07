require('dotenv').config();
const {
    API_KEY
  } = process.env;
  
  const { Genre } = require('../db.js');


  const getGenres = async (req,res,next) => {
    try {

        const genres = await Genre.findAll();
       
        // if(genres.length < 1){
         res.send(genres)
        // }else{
        //     console.log("no existen generos en la BD")
        // }
        
    } catch (error) {
        next(error) //no se rompe toda la aplicacion con un error, continua y muestra el error
    }

};

  module.exports = { getGenres };