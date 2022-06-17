import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGenres, getAllVideogames } from '../redux/actions'
import { Videogames } from './Videogames/Videogames';


export const Home = () => {
    const loading = useSelector((state)=>state.loading)
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getAllGenres())
        dispatch(getAllVideogames())
      }, [dispatch])
  
  
  
    return (
    <div>home
      <div>
        {loading ? <img src='https://i.gifer.com/XOsX.gif' alt='Loading'/>:console.log("cargado")}
      </div>
        <Videogames/>
    </div>
  )
}