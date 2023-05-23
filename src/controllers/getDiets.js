const axios = require("axios");
const { Diet } = require("../db");
const { Op } = require("sequelize");
const KEY = process.env.API_KEY;

const getDiets = async () => {
  // Intento obtener las dietas desde la base de datos
  let diets = [];
  const data = await Diet.findAll();
  const resultados = data;
  // console.log("01: Esto es lo que hay en la DB:");
  // console.log(resultados);

  // Si hay dietas en la DB:
  // ========================
  if (resultados.length > 1) {
    // (porque la Dieta de ejemplo está creada, deben haber más de 1 dietas para considerar que ya se descargaron las dietas)
    diets = [...data];
    // console.log("HABIA DIETAS GUARDADAS");

    // Tratamiento para que las dietas se devuelvan siempre igual,
    // ===========================================================
    // tanto en la primera consulta (desde la API) como en la segunda (DB)
    // Debe devolver un array de strings con los nombres de las dietas
    arrayAux = [];
    diets.forEach((diet) => arrayAux.push(diet.name));
    diets = arrayAux;

    // Si las dietas no se encuentran en la DB (es decir, en "diets"):
  } else {
    // Traemos 50 resultados y obtenemos las dietas desde allí
    const pedido = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&apiKey=${KEY}`
    );

    const recetas = pedido.data.results;

    let dietsSet = new Set(); // Aquí se alojarán los nombres de las dietas

    // Obtengo las propiedades vegetarian, vegan y glutenFree desde el primer resultado
    // console.log("Primer receta:");
    // console.log(recetas[0]);
    const props = Object.keys(recetas[0]);
    // console.log("03: Esto es lo que hay en PROPS:");
    // console.log(props);
    const propsToSearch = ["vega", "vege", "gluten"];
    propsToSearch.forEach((propToSearch) => {
      props.forEach((prop) => {
        if (prop.toLowerCase().includes(propToSearch)) {
          dietsSet.add(prop);
        }
      });
    });

    // Obtengo el resto de las dietas desde cada receta encontrada
    recetas.forEach((receta) => {
      if (receta.diets.length > 0) {
        receta.diets.forEach((diet) => {
          dietsSet.add(diet);
        });
      }
    });

    diets = [...dietsSet];
    let obj = [];
    diets.forEach((elem) => obj.push({ name: elem }));

    // Guardo las dietas en la DB para futuras consultas
    Diet.bulkCreate(obj);

    // Añado la dieta de ejemplo creada por mi (se podría remover cuando no se necesite...)
    diets.unshift(resultados[0].name);

    // (#DESACTIVADO#)
    // Tratamiento para que las dietas se devuelvan siempre igual,
    // ===========================================================
    // tanto en la primera consulta (desde la API) como en la segunda (DB)
    // Debe devolver un array de objetos con una propiedad {name: "Nombre dieta"}
    // arrayAux = [];
    // diets.forEach((diet) => arrayAux.push({ name: diet }));
    // diets = arrayAux;
  }
  // console.log("Diets: ", diets);
  return diets;
};

module.exports = getDiets;
