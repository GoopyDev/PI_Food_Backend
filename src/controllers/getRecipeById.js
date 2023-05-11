const KEY = process.env.API_KEY;
const axios = require("axios");
const { Recipe } = require("../db");
const { Op } = require("sequelize");

const getRecipeById = async (recipeID, source = "api") => {
  let recipe = {};

  // Obtenemos los juegos de la API Spoonacular si el source es "API"
  if (source == "api") {
    console.log("Realizando petición de RECIPE a https://api.spoonacular.com/recipes/716330/information?apiKey="); //prettier-ignore
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${KEY}`
      )
      .then((response) => response.data);
    console.log(data);
    recipe = { ...data };
    // Obtenemos los juegos de la Base local si el source es "DATABASE"
  } else if (source == "database") {
    console.log("Realizando petición de RECIPE a Base de datos local");
    const data = await Recipe.findAll({
      where: { id: { [Op.eq]: recipeID.toString() } },
    });
    console.log(data);
    recipe = data[0];
  } else {
    // Arrojamos error de source
    throw Error(`Source incorrecto, no existe '${source}'`);
  }
  return recipe;
};

module.exports = getRecipeById;
