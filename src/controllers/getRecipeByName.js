const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");
const KEY = process.env.API_KEY;

// Retorna: un array con o sin recetas.

const getRecipeByName = async (recipeName, source = "api") => {
  let recipes = [];
  if (source == "api") {
    // const offset = 0; // Aumentar de a 10 este item para obtener más datos de la API
    // // Obtenemos las recetas de la API Spoonacular
    // console.log(
    //   "Realizando petición de RECIPE por NOMBRE a https://api.spoonacular.com/recipes/complexSearch?query={name}"
    // ); //                                         https://api.spoonacular.com/recipes/complexSearch?query=milanesas&apiKey=

    recipes = await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&number=100&addRecipeInformation=true&apiKey=${KEY}`
      )
      .then((response) => response.data.results);
  } else if (source == "database") {
    // Obtenemos las recetas de la Base local
    // console.log(
    //   "Realizando petición de RECIPE por NOMBRE a Base de datos local"
    // );
    recipes = [
      ...(await Recipe.findAll({
        where: { name: { [Op.iLike]: `%${recipeName}%` } },
      })),
    ];
  } else {
    // Arrojamos error de source
    throw Error(`Source incorrecto, no existe '${source}'`);
  }

  // console.log(recipes);
  return recipes;
};

module.exports = getRecipeByName;
