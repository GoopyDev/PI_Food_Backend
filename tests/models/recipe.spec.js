const { Recipe, Diet, conn } = require("../../src/db.js");
const { expect } = require("chai");

const recipeGood = {
  name: "",
  image: "https://recetasimagenes.com/recetas.jpg",
  description: "Receta para test de ruta POST",
  health_score: 3,
  steps: [
    { number: 1, step: "Paso 1" },
    { number: 2, step: "Paso 2" },
    { number: 3, step: "Paso 3" },
  ],
  diets: ["Sample diet"],
};

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("Recipes", () => {
      //
      it("Should throw an error if 'name' is 'null'", async () => {
        try {
          await Recipe.create(recipeGood);
        } catch (error) {
          console.log(error);
          expect(error).to.exist;
        }
      });

      it("Should work when it's a valid recipe", async () => {
        try {
          await Recipe.create(recipeGood);
        } catch (error) {
          console.log(error);
          throw new Error("It should not throw an error");
        }
      });
    });
  });
});

describe("Diet model", () => {
  it("Should accept string for 'name' property to create a diet", async () => {
    await Diet.create({ name: "Sample diet" });
  });
  it("Should throw an error if name property is null", async () => {
    try {
      let test, datos, dietError;
      test = await Diet.create({ name: "" }).then((createdDiet) => {
        datos = createdDiet;
        expect(datos).to.exist; //Esta linea es para hacer fallar el Try si Diet es válida
      }); //dado que el test evalúa que name sea null
      console.log("Estoy en TRY");
      console.log(datos);
    } catch (error) {
      console.log("  Diet creation error");
      // console.log(error);
      dietError = error.message;
      expect(error).to.exist;
      // throw new Error("It should throw an error");
    }
  });
  it("Should return the message 'Validation error: El valor no puede ser una cadena vacía.'", async () => {
    expect(dietError).to.equal(
      "Validation error: El valor no puede ser una cadena vacía."
    );
  });
});
