
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
 }
  server.listen(3001, () => {
  });
});
