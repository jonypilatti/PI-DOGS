const fetch = require("node-fetch");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require("../db");

module.exports = async function getAPIinfo() {
  const apiURL = await fetch(
    "https://api.thedogapi.com/v1/breeds?api_key=7ddc6f6e-5470-41ff-8f75-cc16b07bd6a2"
  ).then((response) => response.json());
  return apiURL;
};
module.exports = async function getDBInfo() {
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
module.exports = async function getAllInfo() {
  let apiinfo = await getAPIinfo();
  apiinfo.map((el) => {
    el.createdByDB = false;
  });
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
