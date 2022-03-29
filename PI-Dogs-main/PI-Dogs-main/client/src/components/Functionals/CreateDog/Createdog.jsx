/* eslint-disable eqeqeq */
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperament } from "../../../redux/actions/index.js";
import Nav from "../Nav/nav.jsx";
import "./Createdog.css";

const Createdog = () => {
  const navigate = useNavigate();

  function validate(input) {
    let errors = {};
    var regex = new RegExp("^[0-9-]+$");
    if (!input.name) {
      errors.name = "A name is required";
    } else if (input.name.length < 3 || input.name.length > 20) {
      errors.name = "The name must have a length between 3 and 20 characters";
    } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(input.name)) {
      errors.name = "Only capital and lower case letters";
    } else if (
      input.name.includes("-") ||
      input.name.charAt(input.name.length - 1) == " "
    ) {
      errors.name = "Enter a valid name, mix of capital and lower case!";
    }
    //
    //
    //
    else if (!input.height) {
      errors.height = "It's required a height of format 'Hmin-Hmax'";
    } else if (!input.height.charAt(input.height.indexOf("-") + 1)) {
      errors.height = "It's required a height of format 'Hmin-Hmax'";
    } else if (!input.height.includes("-")) {
      errors.height = "It's required a height of format 'Hmin-Hmax'";
    } else if (
      Number(input.height.split("-")[0]) > Number(input.height.split("-")[1])
    ) {
      errors.height = "Maximum height must be higher than the minimum height";
    } else if (regex.test(input.height) == false) {
      errors.height = "Only positive integer numbers!";
    } else if (input.height.charAt(0) == "-") {
      errors.height = "Only positive integer numbers!";
    }
    //
    //
    //
    //
    else if (!input.weight) {
      errors.weight = "It's required a weight of format 'Wmin-Wmax'";
    } else if (!input.weight.includes("-")) {
      errors.weight = "It's required a weight of format 'Wmin-Wmax'";
    } else if (!input.weight.charAt(input.weight.indexOf("-") + 1)) {
      errors.weight = "It's required a weight of format 'Wmin-Wmax'.";
    } else if (
      Number(input.weight.split("-")[0]) > Number(input.weight.split("-")[1])
    ) {
      errors.weight = "Maximum weight must be higher than the minimum weight";
    } else if (regex.test(input.weight) == false) {
      errors.weight = "Only positive integer numbers!";
    } else if (input.weight.charAt(0) == "-") {
      errors.weight = "Only positive integer numbers!";
    }
    //
    //
    else if (!input.life_span) {
      errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
    } else if (!input.life_span.includes("-")) {
      errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
    } else if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
      errors.life_span = "It's required a life span of format 'Vmin-Vmax'";
    } else if (
      Number(input.life_span.split("-")[0]) >
      Number(input.life_span.split("-")[1])
    ) {
      errors.life_span =
        "The maximum life span must be higher than the minimum life span";
    } else if (regex.test(input.life_span) == false) {
      errors.life_span = "Only positive integer numbers!";
    } else if (input.life_span.charAt(0) == "-") {
      errors.life_span = "Only positive integer numbers!";
    }
    ///
    ///
    else if (input.temperament?.length == 5) {
      errors.temperament = "You can only add up to six temperaments";
    }
    //
    if (!errors.name && !errors.height && !errors.weight && !errors.life_span) {
      document.getElementById("Create").disabled = false;
    } else {
      document.getElementById("Create").disabled = true;
    }
    return errors;
  }
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);
  const temperaments = useSelector((state) => state.Temperaments); //aca accedo a los temperamentos de la Store y lo asigno al personaje nuevo.
  //aca traigo el input que luego va a ser despachado a la Store para crear el personaje.
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: { url: "" },
    temperament: [],
  });

  const handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };
  //Cuando se envia el form, agrega el Input al estado global de la Store de los personajes.

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Tu perro fue creado satisfactoriamente!");
    navigate("/home");
  };
  //el handleChange es el que añade el valor del input al estado que estoy por enviar a store por form. tambien tiene la funcion setErrors que es lo que valida.

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
    setErrors(
      validate({
        ...input,
      })
    );
  };
  return (
    <div className="container1">
      <Nav></Nav>
      <h1>Make your own dog race!</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            id="name"
            autocomplete="off"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
        <div className="inputs">
          <label>Height:</label>
          <input
            type="text"
            value={input.height.metric}
            name="height"
            autocomplete="off"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {errors.height && <p className="error">{errors.height}</p>}
        <div className="inputs">
          <label>Weight:</label>
          <input
            type="text"
            value={input.weight.metric}
            name="weight"
            autocomplete="off"
            onChange={handleChange}
          ></input>
        </div>
        {errors.weight && <p className="error">{errors.weight}</p>}
        <div className="inputs">
          <label>Life span:</label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            autocomplete="off"
            onChange={handleChange}
          ></input>
        </div>
        {errors.life_span && <p className="error">{errors.life_span}</p>}
        <div className="inputs">
          <label>Image:</label>
          <input
            type="text"
            value={input.image.url}
            name="image"
            autocomplete="off"
            onChange={(e) =>
              setInput({
                ...input,
                image: { url: e.target.value },
              })
            }
          ></input>
        </div>
        <p>
          Insert a valid URL image or you will be assigned one automatically.
        </p>
        <div className="inputs">
          <label>Temperament:</label>
          <select
            onChange={
              input.temperament.length < 6 ? handleSelect : console.log("ashe")
            }
          >
            {temperaments.map((temp) => (
              <option value={temp.name}>{temp.name}</option>
            ))}
          </select>
        </div>
        {errors.temperament && <p className="error">{errors.temperament}</p>}
        <button id="Create" disabled={true} type="submit">
          Create Dog
        </button>
      </form>
      <div className="temperament">
        {input.temperament?.map((el) => (
          <div class="rowtemps">
            <p>{el}</p>
            <button onClick={() => handleDelete(el)}>X</button>
          </div>
        ))}
      </div>
      <div className="Filler"></div>
    </div>
  );
};

export default Createdog;
