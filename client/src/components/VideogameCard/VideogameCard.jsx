import React from "react";
import { Link } from "react-router-dom";
import "./VideogameCard.css";
export const VideogameCard = ({ id, name, background_image, genres }) => {
  return (
    <div>
      
      <Link className='text-link' to={`/home/${id}` /*envia el id por params */}>
        <div className="card">
          <div className="name">
            <h1>{name}</h1>
          </div>
          <div className="imageContainer">
            <img className="image" src={background_image} alt="img" />
          </div>

          <div className="genres">
            <h3>{genres.join(" ")}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};
