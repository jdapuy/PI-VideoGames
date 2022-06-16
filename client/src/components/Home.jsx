import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideogames } from '../redux/actions'
import { Videogames } from './Videogames/Videogames';


export const Home = () => {
    //const videogames = useSelector((state)=>state.videogames)
    const dispatch = useDispatch();
    useEffect(() => {
        
        
        dispatch(getAllVideogames())
      }, [dispatch])
  
  
  
    return (
    <div>home
        <Videogames/>
    </div>
  )
}