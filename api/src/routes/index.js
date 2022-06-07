const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const videogames = require("./videogames.routes.js")
const genres = require("./genres.routes.js")
router.use("/videogames",videogames)
router.use("/genres",genres)
module.exports = router;
