import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

const landing = () => {
  return (
    <div className="root">
      <div className="positioning">
        <h1 className="title">Welcome to Dogtopia!</h1>
        <h3 className="subtitle">
          Where you can find all information available about dogs and even make
          your own dog races!
        </h3>
        <div>
          <Link to="/home">
            <button className="botoncitoo">Enter here!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default landing;
