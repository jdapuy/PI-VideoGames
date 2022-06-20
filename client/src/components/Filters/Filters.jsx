import React from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import { Order } from "./Order/Order";
import { OriginFilter } from "./OriginFilter/OriginFilter";
import "./Filters.css";

export const Filters = ({setPage,setInput,setOrder}) => {
  const dispatch = useDispatch();  


  const handleOnClick = (e) => {
    dispatch(getAllVideogames())
    setInput(1)
    setPage(1);
  }

  return (
    <div className="container">
      <div>
        <button className="button" value={"noFilters"} onClick={(e)=> handleOnClick(e)}>
        <span className="box">
        Refresh Filters
    </span>
          </button>
          
      </div>
      <div className="order">
        <Order setPage={setPage}  setInput={setInput} setOrder={setOrder}/>
      </div>
      <div className="genreFilter">
        <GenreFilter setPage={setPage}  setInput={setInput}  setOrder={setOrder}/>
      </div>
      <div className="originFilter">
        <OriginFilter setPage={setPage}  setInput={setInput}  setOrder={setOrder}/>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
