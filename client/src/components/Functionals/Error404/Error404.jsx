import React from "react";
import "./Error404.css";

const Error404 = () => {
  return (
    <>
      <div className="container2">
        <div>
          <p>OOPS ERROR 404!</p>
        </div>
        <div>
          <p>SOMETHING WENT INCREDIBLY AWFULLY WRONG!</p>
        </div>
        <button
          className="getback"
          onClick={() => window.location.replace("/home")}
        >
          GET BACK TO HOME
        </button>
      </div>
    </>
  );
};

export default Error404;
