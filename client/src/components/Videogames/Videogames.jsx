import React, {useEffect} from "react";
import { VideogameCard } from "../VideogameCard/VideogameCard";
import  { useDispatch,useSelector } from 'react-redux'
import { getAllVideogames } from "../../redux/actions";
export const Videogames = (props) => {
    
    const dispatch = useDispatch();
    const videogames = useSelector((state)=>state.videogames)
 
    useEffect(() => {
   
     dispatch(getAllVideogames())
    }, [dispatch])
    

  return (
    <div>
      Videogames
      <div>
        {videogames?.map((vg) => {
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
      </div>
    </div>
  );
};

