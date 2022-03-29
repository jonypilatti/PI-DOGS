import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

const nav = (e) => {
  function HandleClick() {
    window.location = "/home";
  }
  return (
    <>
      <div class="flex-container">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div class="letters" onClick={() => HandleClick()}>
            Home
          </div>
        </Link>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <div class="letters">Create Dog</div>
        </Link>
      </div>
    </>
  );
};

export default nav;
