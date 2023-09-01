const fetch = require("node-fetch");
const { Dog, Temperament } = require("../db");

//--------------------------------------MANEJO DE INFO DE API, DB Y UNION DE AMBAS-------------------------------------//

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
const getAllInfo = async () => {
  let apiinfo = await getAPIinfo();
  apiinfo.map((el) => {
    el.createdByDB = false;
  });
  //apiinfo de aca abajo modifico lo que viene de la API para que este igual a lo de la DB y asi poder filtrar correctamente//
  apiinfo.map((el) => {
    if (el.hasOwnProperty("temperament")) {
      let element = el.temperament;
      let Temps = element.split(",");
      let TempMaps = Temps.map((el) => {
        return { name: el };
      });
      el.temperament = TempMaps;
    }
  });
  let dbinfo = await getDBInfo();
  let totalinfo = await apiinfo.concat(dbinfo); //ACA UNO API Y DB
  return totalinfo;
};

const totalinfo = async () => {
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
  return allInfo;
};
//----------------------------MANEJO DE INFO DE API, DB Y UNION DE AMBAS---------------------------------------------------//

//----------------------------------------MANEJO DE TEMPERAMENTS----------------------------------------------------------//
const getTemp = async () => {
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
  // FilteredTemps.forEach(async (el) => {
  //   await Temperament.create({ name: el });
  // }); //ASI ARRANCO, DSP ME ENTERE DE BULKCREATE
  FilteredTemps = FilteredTemps.map((el) => ({
    name: el,
  }));
  await Temperament.bulkCreate(FilteredTemps);
  return FilteredTemps;
};
//--------------------------------------------MANEJO DE TEMPERAMENTS--------------------------------------------//
//-------------------------------------------------MANEJO DE POST-----------------------------------------------//

const post = async (name, weight, height, life_span, temperament, image) => {
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

  return await newDog.addTemperament(TemperamentDB);
};
//------------------------------------------------MANEJO DE POST-------------------------------------------------------//
module.exports = { getAPIinfo, getAllInfo, totalinfo, getTemp, post };
