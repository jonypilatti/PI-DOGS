import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetDogsName } from "../../../redux/actions/index.js";
import "./searchbar.css";

const Searchbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    if (name.trim().length === 0) {
      return alert("Blank spaces are not allowed in the searchbar");
    } else if (name.length > 2) {
      e.preventDefault();
      dispatch(GetDogsName(name));
      setName("");
    } else {
      alert("Introduce a valid search value with at least 3 characters.");
    }
  }

  return (
    <>
      <div class="search">
        <input
          class="search"
          type="search"
          placeholder="Look for a dog breed!"
          value={name}
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </div>
    </>
  );
};
export default Searchbar;
