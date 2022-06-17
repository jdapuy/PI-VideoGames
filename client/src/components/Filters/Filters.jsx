import React from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import { Order } from "./Order/Order";
import { OriginFilter } from "./OriginFilter/OriginFilter";

export const Filters = ({setPage,setInput,setOrder}) => {
  const dispatch = useDispatch();  


  const handleOnClick = (e) => {
    dispatch(getAllVideogames())
    setInput(1)
    setPage(1);
  }

  return (
    <div>
      Filters
      <div>
        <button value={"noFilters"} onClick={(e)=> handleOnClick(e)}>Refresh Filters</button>
      </div>
      <div>
        <Order setPage={setPage}  setInput={setInput} setOrder={setOrder}/>
      </div>
      <div>
        <GenreFilter setPage={setPage}  setInput={setInput}  setOrder={setOrder}/>
      </div>
      <div>
        <OriginFilter setPage={setPage}  setInput={setInput}  setOrder={setOrder}/>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
