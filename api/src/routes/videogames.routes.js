const{Router} = require("express");
const router = Router();

const { getVideogames, crearVG} = require ("../controllers/controllerVideogame.js") 


router.get("/",getVideogames)

router.post("/",crearVG)

module.exports = router;