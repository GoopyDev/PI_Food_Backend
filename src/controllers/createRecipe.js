const { Recipe } = require("../db.js");
const KEY = process.env.API_KEY;

const createRecipe = async (recipeData) => {
  const { name, image, description, health_score, steps } = recipeData;

  const newRecipe = {
    name,
    image,
    description,
    health_score,
    steps,
  };

  return Recipe.create(newRecipe).then((newRecipe) => {
    console.log("Receta creada con éxito");
    return newRecipe.toJSON();
  });
};

module.exports = createRecipe;
