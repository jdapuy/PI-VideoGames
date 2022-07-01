
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
conn.sync({ force: true }).then(async() => { 
 const genres = await Genre.findAll();
 if(genres.length < 1){
  let genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const genresFormat = genresAPI.data.results.map((g)=> { 
   return {
    id: g.id,
    name: g.name
  }
  })
  const genresLoaded = await Genre.bulkCreate(genresFormat);
  console.log("Se ha cargado los generos exitosamente")
 }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
