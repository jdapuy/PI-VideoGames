import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGenres, getAllVideogames } from '../redux/actions'
import { Videogames } from './Videogames/Videogames';


export const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getAllGenres())
        dispatch(getAllVideogames())
      }, [dispatch])
  
  
  
    return (
    <div>
        <Videogames/>
    </div>
  )
}