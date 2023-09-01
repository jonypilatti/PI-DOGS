import React from "react";
import "./Paginado.css";

const Paginado = ({ DogsPerPage, allDogs, paginaSig, paginaPrev, CurrentPage, firstPage, lastPage }) => {
  return (
    <nav className="paginado">
      <button className="botoncito" onClick={firstPage}>
        First Page
      </button>
      <button disabled={CurrentPage === 1} className="botoncito" onClick={paginaPrev}>
        PREV
      </button>
      <button className="botoncito" disabled={CurrentPage === Math.ceil(allDogs / DogsPerPage)} onClick={paginaSig}>
        NEXT
      </button>
      <button className="botoncito" onClick={lastPage}>
        Last Page
      </button>
    </nav>
  );
};

export default Paginado;
