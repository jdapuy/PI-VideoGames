import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  getVideogamesByGenre } from '../../../redux/actions';

export const GenreFilter = ({setPage,setInput,setOrder}) => {
  const dispatch = useDispatch();
  const genres = useSelector((state)=>state.genres)
  const [filter, setFilter] = useState();
  
 

  const handleOnClick = (e)=>{
    e.preventDefault();
    const genre = e.target.value;
    dispatch(getVideogamesByGenre(genre))
    setInput(1)
    setPage(1);
    setOrder("");//reinicia el orden de las cards
    setFilter(genre)
  }

  return (
    <div>GenreFilter
     
      <div>
        {genres?.map((g)=>
          
          <button key={g.id} value={g.name} onClick={(e) => handleOnClick(e)}>{g.name}</button>
        )}
      </div>
    </div>
  )
}
