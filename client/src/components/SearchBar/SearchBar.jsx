import React, { useState } from "react";
import  { useDispatch, } from 'react-redux'
import { getVideogamesName } from "../../redux/actions";


export default function SearchBar() {
    const [inputVg,setInputVg] = useState("")
    const dispatch = useDispatch();

    const handleSubmit= function(e){
        e.preventDefault();
        dispatch(getVideogamesName(inputVg))
    }

    const handleOnChange=function(e){
        setInputVg(e.target.value)
    }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="name Videogame"
        value={inputVg}
        onChange={(e) => handleOnChange(e)}
      />
      <input type="submit" value="Buscar" />
    </form>
  );
}
