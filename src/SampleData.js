const demoDiet = { name: "SampleDiet" };

const demoRecipes = [
  // id name image description health_score steps
  {
    name: "Cebolla con morrones",
    image:
      "https://www.madeleinecocina.com/wp-content/uploads/2015/07/cumpanioDSC_3222.jpg",
    description: "Receta de cebolla con morrones",
    health_score: 3.5,
    steps: [
      { number: 1, step: "Cortar cebollas" },
      { number: 2, step: "Saltear cebollas" },
      { number: 3, step: "Añadir morron" },
    ],
  },
  {
    name: "Feijoada",
    image:
      "https://www.cocinaygastronomia.com/wp-content/uploads/2011/11/feijoada.jpg",
    description: "Receta de feijoada",
    health_score: 3.5,
    steps: [
      { number: 1, step: "Conseguir muchos frijoles" },
      { number: 2, step: "Hervir todo junto" },
      { number: 3, step: "Añadir sal" },
      { number: 4, step: "Comer" },
    ],
  },
  {
    name: "Guiso de papas, longaniza y nopales",
    image:
      "https://www.madeleinecocina.com/wp-content/uploads/2014/12/DSC_2351.jpg",
    description: "Receta de Guiso de papas, longaniza y nopales",
    health_score: 3.5,
    steps: [
      { number: 1, step: "Cortar papas, longaniza" },
      { number: 2, step: "Saltear nopales" },
      { number: 3, step: "Hervir papas" },
      { number: 4, step: "Incorporar los nopales y la longaniza" },
    ],
  },
  {
    name: "Cortadillo",
    image:
      "https://www.madeleinecocina.com/wp-content/uploads/2022/03/Receta-Cortadillo-6-1080x675.jpg",
    description: "Receta de Cortadillo",
    health_score: 3.5,
    steps: [
      { number: 1, step: "Cortar carne" },
      { number: 2, step: "Saltear cebollas" },
      { number: 3, step: "Añadir la carne a las cebollas" },
      { number: 4, step: "Hervir zanahoria" },
      { number: 5, step: "Servir en masa de taco" },
    ],
  },
];

module.exports = {
  demoDiet,
  demoRecipes,
};
