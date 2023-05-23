const { Router } = require("express");
const getRecipes      = require("../controllers/getRecipes"     ); // prettier-ignore
const getRecipeByName = require("../controllers/getRecipeByName"); // prettier-ignore
const getRecipeById   = require("../controllers/getRecipeById"  ); // prettier-ignore
const getDiets        = require("../controllers/getDiets"       ); // prettier-ignore
const createRecipe    = require("../controllers/createRecipe"   ); // prettier-ignore
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get(`/recipes`, async (req, res) => {
  try {
    const { recipeName, source } = req.query;
    const recipes = recipeName ? await getRecipeByName(recipeName, source) : await getRecipes(source); // prettier-ignore
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { source } = req.query;
    // console.log(`Buscando por ID ${id}`);
    let recipe = await getRecipeById(id, source);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get(`/diets`, async (req, res) => {
  try {
    const diets = await getDiets();
    res.status(200).json(diets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// *** POST RECIPES *** //
// Importamos validateRecipeOne() que verifica que los campos para hacer POST no estén vacíos
// Importamos validateRecipeTwo() que verifica que los campos Nombre y Descripción no estén ya creados
const { validateRecipeOne } = require("../controllers/validators/createRecipeValidation1"); // prettier-ignore
const { validateRecipeTwo } = require("../controllers/validators/createRecipeValidation2"); // prettier-ignore
// prettier-ignore
router.post(`/recipes`, validateRecipeOne, validateRecipeTwo, async (req, res) => {
    try {
      const { recipe } = req.body;
      await createRecipe(recipe);
      res.status(201).json("Receta creada con éxito");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
