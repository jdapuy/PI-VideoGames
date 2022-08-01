import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../../redux/actions/index";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./CreateVideogame.css";

/////////////////////////Validaciones//////////////////
export function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name is required";
  } else if (input.name.length > 255) {
    error.name = "Enter less than 255 characters";
  }
  // else if(!/^[A-Za-z0-9\s]+$/g.test(input.name)){
  //   error.name = "Dont enter symbols or ."
  // }
  if (!input.description) {
    error.description = "Description is required";
  } else if (input.description.length > 255) {
    error.description = "Enter less than 255 characters";
  }
  if (input.platforms.length === 0) {
    error.platforms = "Platforms is required";
  }
  if (
    !/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released) &&
    input.released
  ) {
    error.released = "Invalid date format";
  }
  if (!/^[1-5]$/.test(input.rating) && input.rating) {
    error.rating = "Enter a number from 1 to 5";
  }
  if (
    !/.(gif|jpeg|jpg|png)$/i.test(input.background_image) &&
    input.background_image
  ) {
    error.background_image = "Enter a correct image format (gif,jpeg,jpg,png)";
  }
  if (input.genres.length === 0) {
    error.genres = "Genres is required";
  }
  return error;
}

export const CreateVideogame = () => {
  const dispatch = useDispatch();
  const genresApi = useSelector((state) => state.genres);
  const [error, setError] = useState({
    name: "Name is required",
    description: "Name is required",
    platforms: "Platforms is required",
    genres: "Genres is required",
  });

  const [vgInput, setVgInput] = useState({
    name: null,
    description: null,
    released: null,
    rating: null,
    platforms: [],
    background_image: null,
    genres: [],
  });

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

  //////////////manejadores de inputs y botones
  const handleInputChangeVG = function (e) {
    e.target.name === "platforms" //si esta ingresando plataformas, agregarlo a un array
      ? setVgInput({
          ...vgInput,
          platforms: [...vgInput.platforms, e.target.value],
        })
      : e.target.name === "genres" //si esta ingresando plataformas, agregarlo a un array
      ? setVgInput({
          ...vgInput,
          genres: [...vgInput.genres, e.target.value],
        })
      : setVgInput({
          ...vgInput,
          [e.target.name]: e.target.value === "" ? null : e.target.value, //si se escribe y se borra en input, se pasa el dato de null a ""("" = errores)
        });

    let objError = validate({ ...vgInput, [e.target.name]: e.target.value });
    setError(objError);
  };

  const onClose = function (e, array) {
    let arrayFilter = vgInput[array].filter((g) => g !== e.target.name);
    setVgInput({ ...vgInput, [array]: arrayFilter });

    let objError = validate({ ...vgInput, [array]: arrayFilter });
    setError(objError);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log("intentando hacer post");
    await axios.post("/videogames", {
      videogame: vgInput,
      genres: vgInput.genres,
    });
    alert("successfully created videogame");
  };
  ///////////////////////////////////////////////////////////////
  return (
    <div>
      <Nav />
      <div className="createContainer">
        <div>
          <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
            <div className="formItem">
              <label>*Name: </label>
              <input
                name="name"
                placeholder="Name is required"
                className={error.name && "danger"}
                value={vgInput.name}
                onChange={(e) => handleInputChangeVG(e)}
              />
              {error.name && <p className="pError">{error.name}</p>}
            </div>
            <div className="formItem">
              <label>*Description: </label>
              <input
                name="description"
                placeholder="Description is required"
                className={error.description && "danger"}
                value={vgInput.description}
                onChange={(e) => handleInputChangeVG(e)}
              />
              {error.description && (
                <p className="pError">{error.description}</p>
              )}
            </div>
            <div className="formItem">
            <label>Released: </label>
            <input
              name="released"
              placeholder="YYYY-MM-DD"
              className={error.released && "danger"}
              value={vgInput.released}
              onChange={(e) => handleInputChangeVG(e)}
            />
            {error.released && <p className="pError">{error.released}</p>}
            </div>
            <div className="formItem">
            <label>Rating: </label>
            <input
              name="rating"
              placeholder="1-5"
              className={error.rating && "danger"}
              value={vgInput.rating}
              onChange={(e) => handleInputChangeVG(e)}
            />
            {error.rating && <p className="pError">{error.rating}</p>}
            </div>
            <div className="formItem">
            <label>*Platforms: </label>
            <select
              name="platforms"
              className={error.platforms && "danger"}
              onChange={(e) => handleInputChangeVG(e)}
            >
              <option disabled selected>
                Platforms is required
              </option>
              {platformsApi.map((g) => {
                return (
                  <option disabled={vgInput.platforms.includes(g)} value={g}>
                    {g}
                  </option>
                ); //se deshabilita la opt si ya seleccionaste dicha platform
              })}
            </select>
            {error.platforms && <p  className="pError">{error.platforms}</p>}
            </div>
            <div className="formItem">
            <label>Image: </label>
            <input
              name="background_image"
              placeholder="URL"
              value={vgInput.background_image}
              onChange={(e) => handleInputChangeVG(e)}
            />
            {error.background_image && (
              <p className="pError">{error.background_image}</p>
            )}
            </div>
            <div className="formItem">
            <label>Genres: </label>
            <select
              name="genres"
              className={error.genres && "danger"}
              onChange={(e) => handleInputChangeVG(e)}
            >
              <option disabled selected>
                Genres is required
              </option>
              {genresApi?.map((g) => {
                return (
                  //se deshabilita la opt si ya seleccionaste dicho genero
                  <option
                    disabled={vgInput.genres.includes(g)}
                    value={g.name}
                    key={g.id}
                  >
                    {g.name}
                  </option>
                );
              })}
            </select>{" "}
            {error.genres && <p  className="pError">{error.genres}</p>}
            </div>
            {/*si el estado error esta vacio activa el boton create*/}
            {Object.keys(error).length > 0 ? (
              <button className="buttonCreate" type="submit" disabled>
                Create
              </button>
            ) : (
              <button className="buttonCreate" type="submit">Create</button>
            )}
          </form>
        </div>
        {/*///////////////////Platforms y genres agregados por el user */}
        <div className="cardsAddedContainer">
          <div className="platfomsContainer">
            <p>Platforms Selected</p>
            {vgInput.platforms?.map(
              (
                platform //me despliega las plataformas seleccionadas
              ) => (
                <div className="CardCreatedContainer">
                  <div className="headercardCreated">
                    <button
                      className="cardCreatedButton"
                      name={platform}
                      onClick={(e) => onClose(e, "platforms")}
                    >
                      X
                    </button>
                    {/*el segundo parametro de onclose es al arreglo que quiero "filtar" */}
                  </div>
                  <div className="bodyCardCreated">{platform}</div>
                </div>
              )
            )}
          </div>
          <div className="genresContainer">
            <p>Genres Selected</p>
            {vgInput.genres?.map(
              (
                genre //me despliega los generos seleccionados
              ) => (
                <div className="CardCreatedContainer">
                  <div className="headercardCreated">
                    <button
                      className="cardCreatedButton"
                      name={genre}
                      onClick={(e) => onClose(e, "genres")}
                    >
                      X
                    </button>
                    {/*el segundo parametro de onclose es al arreglo que quiero "filtar" */}
                  </div>
                  <div className="bodyCardCreated">{genre}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
