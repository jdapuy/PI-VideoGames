import React from "react";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import { Order } from "./Order/Order";
import { OriginFilter } from "./OriginFilter/OriginFilter";

export const Filters = ({setPage,setInput,setOrder}) => {
    
  return (
    <div>
      Filters
      <div>
        <Order setPage={setPage}  setInput={setInput} setOrder={setOrder}/>
      </div>
      <div>
        <GenreFilter />
      </div>
      <div>
        <OriginFilter />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
