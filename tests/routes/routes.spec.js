/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");
const { default: axios } = require("axios");

const agent = session(app);
const recipe = {
  name: "Milanesa a la napolitana",
  image: "https://imag.bonviveur.com/milanesa-a-la-napolitana.webp",
  description: "Carne vacuna rebozada con pan rallado, y frita en aceite",
  health_score: 7,
  steps: [
    {
      number: 1,
      step: "Mezclar huevos en un bowl, con un poco de ajo, perejil, un poco de sal e ingredientes a gusto",
    },
    { number: 2, step: "Preparar un recipiente con pan rallado" },
    {
      number: 3,
      step: "Ir pasando la carne por la mezcla de huevo y provenzal, y luego pasarla por el recipiente, cubriéndola con pan rallado, y dando golpes para fijar el pan",
    },
    {
      number: 4,
      step: "Es posible repetir el paso anterior, para otorgar más grosor a la capa de pan rallado",
    },
    {
      number: 5,
      step: "Freír las milanesas en una sartén con aceite a fuego fuerte, hasta que estén bien cocidas y se doren (sin quemarse)",
    },
    {
      number: 6,
      step: "Colocar en papel absorbente para quitar el exceso de aceite",
    },
    {
      number: 7,
      step: "Cortar queso y tomates en rodajas, colocarlos sobre cada milanesa. Se puede condimentar con un poco de orégano ",
    },
    {
      number: 8,
      step: "Servir las milanesas con una guarnición como papas fritas o puré",
    },
  ],
  diets: ["Sample diet"],
};

const recipe2 = {
  name: "Receta de test",
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

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );

  xdescribe("GET /recipes", () => {
    it("Should get 200", () => agent.get("/recipes").expect(200));
    let errorData;
    it("Should throw an error for incorrect source", async () => {
      errorData = await agent
        .get("/recipes?source=db")
        .expect(400)
        .then((response) => response);
      expect(Object.keys(errorData._body)[0]).to.equal("error");
    });
    it("Incorrect source error message should be 'Source incorrecto, no existe 'db''", () => {
      expect(errorData._body.error).to.equal(
        "Source incorrecto, no existe 'db'"
      );
    });
  });

  xdescribe("GET /diets", () => {
    let dietsData;
    it("Should get 200", async () => {
      const data = await agent.get("/diets").expect(200);
      dietsData = data;
    });

    // describe("GET /diets", () => {
    it("Should get at least (10) diet names", () => {
      expect(dietsData._body.length).to.be.greaterThan(10);
    });
  });
  // });

  xdescribe("POST /recipes", () => {
    let postResponse;
    it("Should get 201 with a valid recipe", async () => {
      const data = await agent
        .post("/recipes")
        .type("form")
        .send({ recipe: { ...recipe2 } })
        .expect(201);
      // .end((err, res) => );
      postResponse = data;
    });
    it("StatusMessage should be 'Created'", async () => {
      expect(postResponse.res.statusMessage).to.equal("Created");
    });
    it("Response.text should be 'Receta creada con éxito'", async () => {
      expect(postResponse.text).to.equal('"Receta creada con éxito"');
    });
  });
});
