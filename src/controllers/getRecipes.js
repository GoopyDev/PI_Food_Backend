const axios = require("axios");
const { Recipe } = require("../db");
const KEY = process.env.API_KEY;

// Devuelve: un array de RECIPES (aleatorio en el caso de la API)
const getRecipes = async (source = "api") => {
  // prettier-ignore
  let recipes = [];

  if (source == "api") {
    // Obtenemos las recetas de la API Spoonacular

    // Para obtener recetas aleatorias (hay más de 5000), generamos un nro random
    // que obtendrá 10 recetas entre las existentes
    const randomOffset = 10 * Math.floor(Math.random() * 91);
    console.log(randomOffset);

    console.log(`Realizando petición de RECIPES a https://api.spoonacular.com/recipes/complexSearch?offset=${randomOffset}&apiKey=`); // prettier-ignore
    // prettier-ignore
    recipes = await axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?offset=${randomOffset}&apiKey=${KEY}`)
      .then((response) => [...response.data.results]);
  } else if (source == "database") {
    // Obtenemos las recetas de la Base local
    console.log("Realizando petición de RECIPES a Base de datos local");
    recipes = [...(await Recipe.findAll())];
  } else {
    // Arrojamos error de source
    throw Error(`Source incorrecto, no existe '${source}'`);
  }
  // Creamos un objeto que contiene ambos resultados y lo retornamos
  return recipes;
};

module.exports = getRecipes;
