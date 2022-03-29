import React, { useEffect, useState } from "react";
import "./Home.css";
import Searchbar from "../Searchbar/searchbar.jsx";
import Card from "../Card/card.jsx";
import {
  getDogs,
  Order,
  FilterByTemperament,
  FilterCreated,
  getTemperament,
} from "../../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "../Paginado/Paginado.jsx";
import Nav from "../Nav/nav.jsx";
import gif from "../../../img/GIFCARGA.gif";

const Home = () => {
  const Temperaments = useSelector((state) => state.Temperaments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperament());
  }, [dispatch]);
  const allDogs = useSelector((state) => state.Dogs);

  const orderFilter = useSelector((state) => state.orderFilter.FilterApiDB);
  const [CurrentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [DogsPerPage, setDogsPerPage] = useState(8);
  const TotalPages = Math.ceil(allDogs.length / DogsPerPage);
  //-------------------PAGINADO------------------//
  const paginaSig = () => {
    setCurrentPage(CurrentPage + 1);
  };
  const paginaPrev = () => {
    if (CurrentPage !== 1) setCurrentPage(CurrentPage - 1);
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(TotalPages);
  };
  //------------------PAGINADO-------------------//
  //-------------------------INDICES----------------------
  const IndexOfLastDog = CurrentPage * DogsPerPage;
  const IndexOfFirstDog = IndexOfLastDog - DogsPerPage;
  const CurrentDogs = allDogs.slice(IndexOfFirstDog, IndexOfLastDog);
  //--------------------------INDICES------------------------
  let actualorderFilter = useSelector((state) => state.orderFilter);
  //--------------------FILTRAR POR TEMPERAMENTO------------------//
  function Filtersbytemp(e) {
    e.preventDefault();
    dispatch(FilterCreated(actualorderFilter.FilterApiDB));
    dispatch(FilterByTemperament(e.target.value));
    dispatch(Order(actualorderFilter.order));
    setCurrentPage(1);
  }
  //--------------------FILTRAR POR TEMPERAMENTO--------------------//

  //---------------------FILTRAR POR DB----------------------//
  function FiltersCreated(e) {
    e.preventDefault();
    dispatch(FilterCreated(e.target.value));
    dispatch(FilterByTemperament(actualorderFilter.filterTemps));
    dispatch(Order(actualorderFilter.order));
    setCurrentPage(1);
  }
  //----------------------FILTRAR POR DB----------------------//
  //-----------------------ORDENADO--------------------//
  function Orders(e) {
    e.preventDefault();
    dispatch(Order(e.target.value));
    setCurrentPage(1);
  }
  //-----------------------ORDENADO---------------------//
  return (
    <>
      <div className="container">
        <Nav></Nav>
        <div>
          <div className="wrapper2">
            <div className="Sortby">
              Sort by:
              <select defaultValue="asc" onChange={(e) => Orders(e)}>
                <option value="asc">Name A-Z</option>
                <option value="dsc">Name Z-A</option>
                <option value="minwgt">Min/max weight</option>
                <option value="maxwgt">Max/Min weight</option>
              </select>
            </div>
            <div className="Filterby">
              Filter by:
              <select defaultValue={"all"} onChange={(e) => FiltersCreated(e)}>
                <option value="all">All dogs</option>
                <option value="created">By DB</option>
                <option value="API">API only dogs</option>
              </select>
              <select defaultValue="all" onChange={(e) => Filtersbytemp(e)}>
                <option value="all">All</option>
                {Temperaments.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>
            </div>
            <Searchbar></Searchbar>
          </div>
          {CurrentDogs?.length == 0 && orderFilter !== "created" ? (
            <div className="loading">
              LOADING...
              <img
                src={gif}
                alt="SE PUDRIO EL SOQUE"
                height="350"
                width="350"
              ></img>
            </div>
          ) : (
            <div>
              <div className="wrapper">
                {CurrentDogs.length > 0 ? (
                  CurrentDogs.map((el) => (
                    <div class="card">
                      <Card
                        name={el.name}
                        weight={el.weight?.metric}
                        temperament={el.temperament}
                        image={el.image?.url}
                        createdByDB={el.createdByDB}
                      ></Card>
                    </div>
                  ))
                ) : (
                  <div
                    className="loading2"
                    style={
                      // eslint-disable-next-line eqeqeq
                      orderFilter == "created" && CurrentDogs.length == 0
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <p>NO DOGS WERE FOUND</p>
                    <img
                      src={gif}
                      alt="SE PUDRIO EL SOQUE"
                      height="300"
                      width="300"
                    ></img>
                  </div>
                )}
              </div>
              <Paginado
                DogsPerPage={DogsPerPage}
                allDogs={allDogs.length}
                CurrentPage={CurrentPage}
                setCurrentPage={setCurrentPage}
                firstPage={firstPage}
                paginaPrev={paginaPrev}
                paginaSig={paginaSig}
                lastPage={lastPage}
              ></Paginado>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
