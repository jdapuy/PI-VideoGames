import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAllGenres } from "../../redux/actions/index";
import axios from "axios";


export const CreateVideogame = () => {
  const dispatch = useDispatch();
  const genresApi = useSelector((state) => state.genres);
  const platformsApi = [
    "PC",
    "PlayStation",
    "Xbox",
    "iOS",
    "Android",
    "Apple Macintosh",
    "Linux",
    "Nintendo",
    "Atari",
    "Jaguar",
    "Commodore / Amiga",
    "SEGA",
    "3DO",
    "Neo Geo",
    "Web",
    "Apple Macintosh",
  ];
  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const [vgInput, setVgInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    background_image: "",
  });
  const [genresInput, setGenresInput] = useState([]);

  const handleInputChangeVG = function (e) {
    e.target.name === "platforms" //si esta ingresando plataformas, agregarlo a un array
      ? setVgInput({
          ...vgInput,
          platforms: [...vgInput.platforms, e.target.value],
        })
      : setVgInput({
          ...vgInput,
          [e.target.name]: e.target.value,
        });
  };

  const handleInputChangeGenres = function (e) {
    setGenresInput([...genresInput, e.target.value]);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log("intentando hacer post")
    await axios.post("http://localhost:3001/videogames",{ videogame: vgInput, genres: genresInput });
  };

  console.log(vgInput.name + " " + genresInput);
  return (
    <div>
      CreateVideogame
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name: </label>
        <input
          name="name"
          value={vgInput.name}
          onChange={(e) => handleInputChangeVG(e)}
        />
        <label>Description: </label>
        <input
          name="description"
          value={vgInput.description}
          onChange={(e) => handleInputChangeVG(e)}
        />
        <label>Released: </label>
        <input
          name="released"
          value={vgInput.released}
          onChange={(e) => handleInputChangeVG(e)}
        />
        <label>Rating: </label>
        <input
          name="rating"
          value={vgInput.rating}
          onChange={(e) => handleInputChangeVG(e)}
        />
        <label>Platforms: </label>
        <select name="platforms" onChange={(e) => handleInputChangeVG(e)}>
          {platformsApi.map((g) => {
            return (
              <option value={g}>
                {g}
              </option>
            );
          })}
        </select>
        <label>Image: </label>
        <input
          name="background_image"
          value={vgInput.background_image}
          onChange={(e) => handleInputChangeVG(e)}
        />
        <label>Genres: </label>
        <select name="genres" onChange={(e) => handleInputChangeGenres(e)}>
          {genresApi?.map((g) => {
            return (
              <option value={g.name} key={g.id}>
                {g.name}
              </option>
            );
          })}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
