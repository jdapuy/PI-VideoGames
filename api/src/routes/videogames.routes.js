const{Router} = require("express");
const router = Router();

const { getVideogames,getVideogamesId, crearVG} = require ("../controllers/controllerVideogame.js") 



router.get("/",getVideogames)

router.get("/:idVideogame",getVideogamesId)

router.post("/",crearVG)

module.exports = router;