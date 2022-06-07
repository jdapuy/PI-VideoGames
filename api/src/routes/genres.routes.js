const{Router} = require("express");
const router = Router();


const { getGenres } = require ("../controllers/controllerGenre") 


router.get("/",getGenres)

module.exports = router;