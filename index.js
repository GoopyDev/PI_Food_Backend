require("dotenv").config();
const { PORT } = process.env;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { SampleDataCreate } = require("./src/SampleDataCreate.js");

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(
    // Iniciamos el servidor
    server.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
    })
  )
  .then(async () => {
    console.log("Intento crear datos de ejemplo");
    try {
      SampleDataCreate(conn);
      console.log("Datos creados correctamente");
    } catch (error) {
      console.error(error);
    }
  });
