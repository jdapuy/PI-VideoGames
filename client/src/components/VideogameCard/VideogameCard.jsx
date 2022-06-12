import React from 'react'
import { Link } from 'react-router-dom';

export const VideogameCard = ({id,name,background_image,genres}) => {
  return (
    <div>VideogameCard
        <div>
            <h1>{name}</h1>
            <Link to={`/home/${id}` /*envia el id por params */}> 
            <img src={background_image} alt="img" />
            </Link>
            <h3>{genres.join(" ")}</h3>
        </div>
    </div>
  )
}
