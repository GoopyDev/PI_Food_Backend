// La primer validación chequea si hay una receta en el Body del request.
// También analiza que estén todos los campos necesarios.

const validateRecipeOne = (req, res, next) => {
  // console.log(req);
  // console.log(res);
  console.log("╔═══════════════════════════════╗");
  console.log("║=== INICIANDO VALIDACIÓN #1 ===║");

  // Valido si se ha enviado una receta en el body
  if (!req.body.recipe) {
    console.log("║    [       FAILED        ]    ║");
    console.log("╚═══════════════════════════════╝");

    return res.status(400).json({ error: "Error en la validación #1, no se proporcionó una receta para crear" }); // prettier-ignore
  }

  //  id  name  image  description  health_score  steps
  const { name, image, description, health_score, steps } = req.body.recipe; // prettier-ignore

  // Valido si están todos los campos necesarios para la creación de la receta
  // prettier-ignore
  if ( !name || !image || !description || !health_score || !steps ) {
      return res.status(400).json({ error: "Error en la validación #1, faltan datos" }); // prettier-ignore
  }
  console.log("║    [         OK          ]    ║");
  next();
};

module.exports = { validateRecipeOne };
