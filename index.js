const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Recipe } = require("./src/db.js");
const { demoRecipes } = require("./src/SampleData.js");

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(
    // Iniciamos el servidor
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    })
  )
  .then(async () => {
    console.log("Intento crear datos de ejemplo");
    try {
      // Creamos algunas recetas de ejemplo en la DB
      await Recipe.bulkCreate(demoRecipes);
      console.log("Datos creados correctamente");
    } catch (error) {
      console.error(error);
    }
  });
