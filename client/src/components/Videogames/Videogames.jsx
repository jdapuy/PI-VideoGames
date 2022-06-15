import React, {useEffect, useState} from "react";
import { VideogameCard } from "../VideogameCard/VideogameCard";
import  { useDispatch,useSelector } from 'react-redux'
import { getAllVideogames } from "../../redux/actions";
import { Pagination } from "../Pagination/Pagination";
export const Videogames = (props) => {
    
    const dispatch = useDispatch();
    const videogames = useSelector((state)=>state.videogames)

    ///////estados de paginacion///////////
    const [page,setPage]= useState(1);
    const [perPage,setPerPage] = useState(15);
    const [input,setInput] = useState(1); //para los inputs de paginacion, poder cambiar ambos en paralelo
    const max = videogames.length / perPage;
    //////////////////////////////////////
    useEffect(() => {
   
     dispatch(getAllVideogames())
    }, [dispatch])
    

  return (
    <div>
      Videogames
      <div>
      <Pagination page ={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} max={max} input={input} setInput={setInput}/>
        {videogames?.slice((page - 1) * perPage , (page - 1)* perPage + perPage).map((vg) => {
          return (<div>
            <VideogameCard
              key={vg.id}
              id={vg.id}
              name={vg.name}
              background_image={vg.background_image}
              genres={vg.genres}
            />
            </div>
          );
        })}
         <Pagination page ={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} max={max} input={input} setInput={setInput}/>
      </div>
    </div>
  );
};

