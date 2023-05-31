const { Recipe, Diet } = require("./db.js");
const { demoDiet, demoRecipes } = require("./SampleData.js");

const SampleDataCreate = async (conn) => {
  // Crear una transacción
  const t = await conn.transaction();

  try {
    // Crear dieta de ejemplo
    const dieta = await Diet.create(demoDiet, { transaction: t });

    // Crear las recetas de ejemplo y asociarlas con la dieta
    for (const recipeData of demoRecipes) {
      const recipe = await Recipe.create(recipeData, { transaction: t });
      await recipe.addDiets([dieta], { transaction: t });
    }

    // Confirmar la transacción
    await t.commit();
  } catch (error) {
    // Si ocurre algún error, deshacer la transacción
    await t.rollback();
    throw error;
  }
};
module.exports = { SampleDataCreate };
