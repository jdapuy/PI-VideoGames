import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getVideogamesAsc,
  getVideogamesDesc,
  getVideogamesOrderABC,
  getVideogamesOrderZYX,
} from "../../../redux/actions";

export const Order = ({ setPage,setInput,setOrder }) => {
  const dispatch = useDispatch();
  
  // const videogames = useSelector((state)=>state.videogames)
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
      Order
      <h1>Order</h1>
      <h2>Name</h2>
      <button name="ABC" onClick={(e) => handleOnClick(e)}>
        ABC...
      </button>
      <button name="ZYX" onClick={(e) => handleOnClick(e)}>
        ZYX...
      </button>
      <h2>Rating</h2>
      <button name="+Rating-" onClick={(e) => handleOnClick(e)}>
        +Rating-
      </button>
      <button name="-Rating+" onClick={(e) => handleOnClick(e)}>
        -Rating+
      </button>
    </div>
  );
};
