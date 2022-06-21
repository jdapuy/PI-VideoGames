import React from 'react'
import { Link } from 'react-router-dom';
import "./LandingPage.css"; 

export const LandingPage = () => {
  return (
    <div className='LPContainer'>
      <div>
      <p>Videogames-CREATED BY JUAN DIEGO APUY VILLALOBOS</p>
     <img className='arcadeImg' src='https://www.pngmart.com/files/13/Arcade-Machine-PNG-Picture.png'/>
     <Link className='text-link' to={`/home` /*envia el id por params */}>
     <button className='LPButton'>START</button>
     </Link>
      </div>
    </div>
  )
}
