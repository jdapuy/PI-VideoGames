import "./App.css";
import { Route } from "react-router-dom";
import { Videogames } from "./components/Videogames/Videogames";
import {LandingPage} from "./components/LandingPage/LandingPage"
import {VideogameDetail} from "./components/VideogameDetail/VideogameDetail"
import { CreateVideogame } from "./components/CreateVideogame/CreateVideogame";

function App() {
  return (
    <div className="App">
     
      <Route exact path={"/"} component={LandingPage} />
      <Route exact path={"/home"} component={Videogames} />
      <Route exact path={"/create"} component={CreateVideogame}/>
      <Route exact path={"/home/:videogameId"} component={VideogameDetail} />
    </div>
  );
}

export default App;
