import React from "react";
import { useDispatch } from "react-redux";
import {
  getVideogamesAsc,
  getVideogamesDesc,
  getVideogamesOrderABC,
  getVideogamesOrderZYX,
} from "../../../redux/actions";

export const Order = ({ setPage,setInput,setOrder }) => {
  const dispatch = useDispatch();
  
  const handleOnClick = (e) => {
   e.preventDefault();
    
    if (e.target.name === "ABC") {
      dispatch(getVideogamesOrderABC());
    }

    if (e.target.name === "ZYX") {
      dispatch(getVideogamesOrderZYX());
    }
    if (e.target.name === "+Rating-") {
      dispatch(getVideogamesDesc()); //mayor a menor
    }

    if (e.target.name === "-Rating+") {
      dispatch(getVideogamesAsc()); //menor a mayor
    }
    setOrder(e.target.name);
    setInput(1)
    setPage(1);
  };

  return (
    <div>
      <h2>Order</h2>
      <button className="button" name="ABC" onClick={(e) => handleOnClick(e)}>
        ABC...
      </button>
      <button className="button" name="ZYX" onClick={(e) => handleOnClick(e)}>
        ZYX...
      </button>
      <button className="button" name="+Rating-" onClick={(e) => handleOnClick(e)}>
        +Rating-
      </button>
      <button className="button" name="-Rating+" onClick={(e) => handleOnClick(e)}>
        -Rating+
      </button>
    </div>
  );
};
