import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Functionals/Home/Home.jsx";
import Createdog from "./components/Functionals/CreateDog/Createdog";
import Landing from "./components/Functionals/Landing/landing.jsx";
import Detail from "./components/Functionals/Detail/Detail.jsx";
import Error404 from "./components/Functionals/Error404/Error404.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/create" element={<Createdog></Createdog>}></Route>
          <Route exact path="/dog/:name" element={<Detail></Detail>}></Route>
          <Route path="*" element={<Error404></Error404>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
