import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../Nav/nav.jsx";
import gif from "../../../img/GIFCARGA.gif";
import "./Detail.css";
const Detail = () => {
  const [dog, setDog] = useState({});
  let { name } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/dogs/${name}`)
      .then((response) => response.json())
      .then((response) => setDog(response))
      .catch((error) => {
        window.location.replace("/*");
      });
  }, []);

  return (
    <>
      <div className="detail">
        <Nav />
        <div
          className="loading"
          style={!dog.name ? { display: "block" } : { display: "none" }}
        >
          <p> LOADING!</p>
          <img
            src={gif}
            alt="SE PUDRIO EL SOQUE"
            height="300"
            width="300"
          ></img>
        </div>
        <div style={dog.name ? { display: "block" } : { display: "none" }}>
          <div className="detail2">
            <img
              src={dog.image?.url}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://cdn.com.do/wp-content/uploads/2016/08/PERRO-CHINA.jpg";
              }}
              alt="Dog NOT FOUND"
            ></img>
            <div>Name: {dog.name}</div>
            <div>Life span: {dog.life_span} years</div>
            <div>Weight: {dog.weight?.metric} Kg.</div>
            <div>Height: {dog.height?.metric} Cm.</div>
            <div>Temperaments: {dog.temperament?.map((el) => el.name)}</div>
            <div>Origin: {dog.origin ? dog.origin : "Unknown"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
