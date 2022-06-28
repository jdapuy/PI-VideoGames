import React, { useEffect, useState } from "react";
import { VideogameCard } from "../VideogameCard/VideogameCard";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../Pagination/Pagination";
import Nav from "../Nav/Nav";
import { Filters } from "../Filters/Filters";
import "./Videogames.css";
export const Videogames = (props) => {
  const loading = useSelector((state)=>state.loading)
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  ///////estado para renderizar orders////
  const [order, setOrder] = useState();
  ///////estados de paginacion///////////
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [input, setInput] = useState(1); //para los inputs de paginacion, poder cambiar ambos en paralelo
  const max = videogames.length / perPage;
  //////////////////////////////////////
  useEffect(() => {}, [videogames, dispatch, order]); //DEPENDE DEL ORDENAMIENTO, SI CAMBIA SE ACTULIZA EL ESTADO

  return (
    <div className="parent">
      <div className="navContainer">
        <Nav  className="navContainer" setPage={setPage} setInput={setInput}/>
      </div>
      <div className="menu">
        <Filters setPage={setPage} setInput={setInput} setOrder={setOrder} />
      </div>
      <div className="banner"></div>
      <div className="content" >
      {loading ? <img className="loading" src= "https://i.gifer.com/XwI4.gif" /*'https://i.gifer.com/XOsX.gif'*/ alt='Loading'/>:console.log("cargado")}
        <div className="pagination">
          <Pagination
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            max={max}
            input={input}
            setInput={setInput}
          />
        </div>
        <div className="cardsContent">
          {videogames
            ?.slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((vg) => {
              return (
                <VideogameCard
                  key={vg.id}
                  id={vg.id}
                  name={vg.name}
                  rating={vg.rating}
                  background_image={vg.background_image}
                  genres={vg.genres}
                />
              );
            })}
        </div>
        <div className="pagination">
          <Pagination
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            max={max}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </div>
  );
};
