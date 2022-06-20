import React, { useState } from "react";
import  { useDispatch, } from 'react-redux'
import { getVideogamesName } from "../../redux/actions";
import "./SearchBar.css"
import { useLocation } from "react-router-dom"


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

    const location = useLocation();
    if(location.pathname==="/home"){ //si esta en home renderiza el componente de busqueda
      return (
        <form  onSubmit={(e) => handleSubmit(e)}>
          <input
          className="inputForm"
            type="text"
            placeholder="Videogame"
            value={inputVg}
            onChange={(e) => handleOnChange(e)}
          />
          <input className="buttonForm" type="submit" value="Search" />
        </form>
      );
    }else{
      return (<div></div>)
    }
  
}
