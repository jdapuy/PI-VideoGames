import React from "react";
import "./Nav.css"
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Nav() {
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
        <li>
          <SearchBar className="itemNav" />
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Nav;
