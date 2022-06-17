import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getVideogamesByOrigin } from '../../../redux/actions';

export const OriginFilter = ({setInput,setPage,setOrder}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState();
 const handleOnClick = (e)=>{
    e.preventDefault();
    const origin = e.target.value;
    dispatch(getVideogamesByOrigin(origin))
    setInput(1)
    setPage(1);
    setOrder("");//reinicia el orden de las cards
    setFilter(origin)
  }

  return (
    <div>OriginFilter
      <div>
       <button value="Created" onClick={(e) => handleOnClick(e)}>Created</button>
       <button value="API" onClick={(e) => handleOnClick(e)}>API</button>
      </div>
    </div>
  )
}
