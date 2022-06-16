import React from 'react';

import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';


function Nav() {
  return (
    <nav>
      <Link to='/home'>
        <span >
          Videogames-PI
        </span>
      </Link>
      <Link to='/create'>
        <span>Create</span>
      </Link>
        <SearchBar/>
    </nav>
  );
};


export default Nav;
