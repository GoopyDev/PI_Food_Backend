// Esta segunda validación busca en la base de datos si existe
// el nombre o la descripción de la receta.
// Si ya existen, impide duplicar estos valores

const { Recipe } = require("../../db.js");

const validateRecipeTwo = async (req, res, next) => {
  console.log("║=== INICIANDO VALIDACIÓN #2 ===║");

  // id name image description health_score steps
  const { name, description } = req.body.recipe; // prettier-ignore

  const nameFound = await Recipe.findOne({
    where: { name: name },
  });
  const descriptionFound = await Recipe.findOne({
    where: { description: description },
  });

  if (nameFound) {
    console.log("║    [       FAILED        ]    ║");
    console.log("╚═══════════════════════════════╝");
    return res.status(409).json({ error: "Error en la validación #2, ya existe una receta con ese nombre" }); // prettier-ignore
  }
  if (descriptionFound) {
    console.log("║    [       FAILED        ]    ║");
    console.log("╚═══════════════════════════════╝");
    return res.status(409).json({ error: "Error en la validación #2, ya existe una receta con esa descripción" }); // prettier-ignore
  }
  console.log("║    [         OK          ]    ║");
  console.log("╚═══════════════════════════════╝");

  console.log("Validé esto:");
  console.log(req.body.recipe);
  next();
};

module.exports = { validateRecipeTwo };
