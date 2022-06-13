import React from 'react'
import { useEffect } from 'react';
import  { useDispatch,useSelector } from 'react-redux'
import {getVideogame} from "../../redux/actions/index"

export const VideogameDetail = (props) => {
    
    const dispatch = useDispatch();
    const videogame = useSelector((state)=>state.videogame)
    const videogameId = props.match.params.videogameId;
    useEffect(()=>{
        dispatch(getVideogame(videogameId))
    },[dispatch,videogameId])
    
  return (

    <div>VideogameDetail
        <h1>{videogame.name}</h1>
        <img src={videogame.background_image} alt="img" />
        {videogame.description}
        <p>{videogame.rating}</p>
        <p>{videogame.platforms}</p>
        <p>{videogame.genres}</p>
    </div>

  )
}
