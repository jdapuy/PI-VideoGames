import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../redux/actions/index";
import star from "../../Images/Star.png";
import banner from  "../../Images/banner.jpg";
import "./VideogameDetail.css"
import Nav from "../Nav/Nav";

export const VideogameDetail = (props) => {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);
  const videogameId = props.match.params.videogameId;
  useEffect(() => {
    dispatch(getVideogame(videogameId));
  }, [dispatch, videogameId]);
  
  let stars = [];
  for (let index = 0; index < parseInt(Math.floor(videogame.rating)); index++) {
    stars.push(star);
  }
  
  return (
    <div>
      <Nav/>
      <div className="detailContainer">
      <div className="nameDetail">
        <p>{videogame.name}</p>
      </div>
      <div className="bannerDetail" >
        <img className="imgBannerDetail" src={banner} alt="banner image"/>
      </div>
      <div className="descriptionDetail" dangerouslySetInnerHTML={{ __html: videogame.description }}>

      </div>
      <div className="imgDetailContainer">
        <img className="imgDetail" src={videogame.background_image} alt="img" />
      </div>
      <div className="ratingDetail" >
        <p>{`Raiting: ${videogame.rating}`}</p>
          {stars.map((s,i) => (
              <img className="star" key={i} src={s} alt="rating" />
          ))}
      </div>
      <div className="released">
      <p>{`Released: ${videogame.released}`}</p>
      </div>
      <div className="platformsDetail">
        <p>{`Platforms: ${videogame.platforms}`}</p>
      </div>
      <div className="genresDetail">
        <p>{`Genres: ${videogame.genres}`}</p>
      </div>
    </div>
    </div>
    
  );
};
