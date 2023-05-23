// Esta función recibe un array de Recipes con el atributo Diets (dietas asociadas) y
// limpia el array de Diets para quitar los datos extra que no se necesitan, y en su
// lugar devuelve un array de strings con los nombres de las dietas
// Lo utilizan los controllers:
// -getRecipes()
// -

// Recibe un array de la siguiente forma:
//  [
//    {
//      diets:  [
//                {name: "dieta 1", propExtra1: "1", propExtra2: "2"},
//                {name: "dieta 2", propExtra1: "1", propExtra2: "2"},
//                {name: "dieta 3", propExtra1: "1", propExtra2: "2"},
//              ],
//      otrasProps1: "Otros Valores 1",
//      otrasProps2: "Otros Valores 2",
//    },
//
//    {
//      diets:  [
//                {name: "dieta 1", propExtra1: "1", propExtra2: "2"},
//                {name: "dieta 2", propExtra1: "1", propExtra2: "2"},
//                {name: "dieta 3", propExtra1: "1", propExtra2: "2"},
//              ],
//      otrasProps1: "Otros Valores 1",
//      otrasProps2: "Otros Valores 2",
//    }
//  ]

const cleanDiets = (recipes) => {
  let filteredRecipes = [];
  // console.log(`Diets: ${recipes[0].diets}`);
  recipes.forEach((recipe) => {
    let dietNames = [];
    recipe.diets.forEach((diet) => {
      dietNames.push(diet.name);
    });
    console.log(dietNames);
    filteredRecipes.push({
      // id name image description health_score steps
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      health_score: recipe.health_score,
      steps: recipe.steps,
      diets: dietNames,
    });
  });
  console.log("Te devuelvo:", filteredRecipes);
  return filteredRecipes;
};
module.exports = { cleanDiets };
