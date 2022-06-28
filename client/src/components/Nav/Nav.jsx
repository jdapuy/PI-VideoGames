import React from "react";
import "./Nav.css"
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom"

function Nav({setPage, setInput}) {

  const location = useLocation();
  return (
    <nav>
      <div className="navBar">
      <ul className="topnav">
        <li>
          <Link className="itemNav" to="/home">
            <h1>Videogames-PI</h1>
          </Link>
        </li>
        <li>
          <Link className="itemNav" to="/create">
            <h2>Create</h2>
          </Link>
        </li>
       {location.pathname==="/home" &&
 <li>
 <SearchBar className="itemNav"  setPage={setPage} setInput={setInput}/>
</li>
       }
      </ul>
      </div>
    </nav>
  );
}

export default Nav;
