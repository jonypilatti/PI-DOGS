const { Router, response } = require("express");
const fetch = require("node-fetch");
const { save } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog, Temperament } = require("../db");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getAPIinfo = async () => {
  const apiURL = await fetch(
    "https://api.thedogapi.com/v1/breeds?api_key=7ddc6f6e-5470-41ff-8f75-cc16b07bd6a2"
  ).then((response) => response.json());
  return apiURL;
};
const getDBInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
let getAllInfo = async () => {
  let apiinfo = await getAPIinfo();
  apiinfo.map((el) => {
    el.createdByDB = false;
  });
  //apiinfo de aca abajo modifico lo que viene de la API para que este igual a lo de la DB y asi poder filtrar correctamente
  apiinfo.map((el) => {
    if (el.hasOwnProperty("temperament")) {
      let element = el.temperament;
      let Temps = element.split(","); // .replace(/ /g, "") para eliminar los espacios
      let TempMaps = Temps.map((el) => {
        return { name: el };
      });
      el.temperament = TempMaps;
    }
  });
  let dbinfo = await getDBInfo();
  let totalinfo = await apiinfo.concat(dbinfo);
  return totalinfo;
};

router.get("/dogs", async (req, res) => {
  let allInfo = await getAllInfo();
  allInfo.forEach((el) => {
    if (el.name == "Olde English Bulldogge") {
      el.weight.metric = "22-30";
    }
    if (!el.weight.metric.includes("-")) {
      el.weight.metric = `4 - ${el.weight.metric}`;
    } //aca le puse 4 de minimo porque como vienen de la API es un peso apropiado para cachorro
    allInfo.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  });
  if (req.query.name) {
    const { name } = req.query;
    let search = allInfo.find(
      (e) => e.name.toLowerCase() == name.toLowerCase()
    );
    search ? res.status(200).json(search) : res.status(404).redirect("/home");
  } else {
    res.status(200).send(allInfo);
  }
});

router.get("/dogs/:name", async (req, res) => {
  const { name } = req.params;
  let allInfo = await getAllInfo();
  let DogParams = allInfo.find(
    (e) => e.name.toLowerCase() == name.toLowerCase()
  );
  DogParams
    ? res.status(200).send(DogParams)
    : res.status(404).send("NO ESTA LLEGANDO EL PERRO POR PARAMS");
}),
  router.get("/temperament", async (req, res) => {
    let getDBInfo = await Temperament.findAll();
    if (getDBInfo.length > 0) {
      res.json(getDBInfo);
    } else {
      let getAPIinfo2 = await getAPIinfo();
      let TemperamentosAPI = getAPIinfo2
        .map((el) => el.temperament)
        .sort()
        .join();
      let Temperamentosarray = TemperamentosAPI.split(
        ",",
        TemperamentosAPI.length
      ).sort();
      let TempArrayToSet = new Set(Temperamentosarray);
      let FilteredTemps = Array.from(TempArrayToSet); //ASI YA ES UN ARRAY. PUEDO PASARLO A STRING Y METERLO EN DB.
      FilteredTemps.shift();
      FilteredTemps.forEach(async (el) => {
        await Temperament.create({ name: el });
      });
      FilteredTemps = FilteredTemps.map((el) => ({
        name: el,
      }));
      res.json(FilteredTemps);
    }
  });

router.post("/dog", async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;
  let image = req.body.image;
  let newDog = await Dog.create({
    name: name,
    height: { metric: height },
    weight: { metric: weight },
    life_span: life_span,
    image: image,
    createdByDB: true,
  });
  let TemperamentDB = await Temperament.findAll({
    where: { name: temperament },
  });

  newDog.addTemperament(TemperamentDB);

  return res.status(200).json({ msg: "Perro creado con exito!" });
});

module.exports = router;
