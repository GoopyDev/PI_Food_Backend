const axios = require("axios");
const { Diet } = require("../db");
const { Op } = require("sequelize");
const KEY = process.env.API_KEY;

const getDiets = async () => {
  // Intento obtener las dietas desde la base de datos
  let diets = [];
  const data = await Diet.findAll();
  const resultados = data;
  console.log("01: Esto es lo que hay en la DB:");
  console.log(resultados);

  // Si hay dietas en la DB:
  if (resultados.length > 0) {
    diets = [...data];
    console.log("HABIA DIETAS GUARDADAS");

    // Si las dietas no se encuentran en la DB (es decir, en "diets"):
  } else {
    // Traemos 50 resultados y obtenemos las dietas desde allí
    const pedido = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&apiKey=${KEY}`
    );

    const recetas = pedido.data.results;

    let dietsSet = new Set();

    // Obtengo las propiedades vegetarian, vegan y glutenFree desde el primer resultado
    console.log("Primer receta:");
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
    console.log("dietsSet:");
    console.log(dietsSet);
    console.log("diets:");
    console.log(diets);
    diets.forEach((elem) => obj.push({ name: elem }));

    // Guardo las dietas en la DB para futuras consultas
    Diet.bulkCreate(obj);
  }
  console.log("Diets: ", diets);
  return diets;
};

module.exports = getDiets;
