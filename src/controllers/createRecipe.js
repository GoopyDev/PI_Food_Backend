const { Op } = require("sequelize");
const { Recipe, Diet, conn } = require("../db.js");
const KEY = process.env.API_KEY;

const createRecipe = async (recipeData) => {
  const { name, image, description, health_score, steps, diets } = recipeData;

  // console.log(recipeData);

  const t = await conn.transaction();
  let dietsArray;
  let newRecipe;
  let recipeJSON;

  dietsArray = await Promise.all(
    diets?.map(async (dietName) => {
      console.log("Buscando dieta: ", dietName);
      return await Diet.findOne({
        where: {
          name: {
            [Op.like]: `${dietName}`,
          },
        },
      });
    })
  );
  console.log(dietsArray);

  try {
    newRecipe = await Recipe.create(
      {
        name,
        image,
        description,
        health_score,
        steps,
      },
      { transaction: t }
    );
    await newRecipe.addDiets(dietsArray, { transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }

  recipeJSON = newRecipe.toJSON();

  //Impresiones en consola
  console.log("dietsArray");
  console.log(dietsArray);
  // console.log("newRecipe");
  // console.log(newRecipe);

  return recipeJSON;
};

module.exports = createRecipe;
