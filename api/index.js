
// ░░░░█████░░░░░░░░
// ░░░█▓▓▒▓▓██░░░░░
// ░░░█▓▒▒▒▓▓▓█░░░░
// ░░███████▓▓▓█░░░░
// ░██████████▓▓█░░░
// ░███████████▓▓█░░
// ░░██░░▒░░▒██▓██░░
// ░░░█░█▒█░▒▒██▒▒█░
// ░░█▒░█▒█░▒▒██▒▒█░
// ░░█▒▒▒▒▒▒▒██▒▒▒█░
// ░░█▒▒▒▒██▒▒█▒▒▒█░
// ░░███████▒▒▒██░░
// ░░██████▒▒▒▒██░░░
// ░░░░█▒▒▒▒▒▒██░░░
// ░░░░░██████░
require('dotenv').config();
const {
    API_KEY
  } = process.env;
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => { //colocar en false si queremos dejar informacion anterior en la bd
 //se precargan los generos de la api a la base de datos antes de iniciar el servidor
 //verificar que no hay nada en la bd, agregar cada genero de la api en la bd
 const genres = await Genre.findAll();
 if(genres.length < 1){//si esta vacio
  let genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const genresFormat = genresAPI.data.results.map((g)=> { //filtra los generos de la api por name y id
   return {
    id: g.id,
    name: g.name
  }
  })
  const genresLoaded = await Genre.bulkCreate(genresFormat); //me carga el arreglo de generos a la bd
  console.log("Se ha cargado los generos exitosamente")
 }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
