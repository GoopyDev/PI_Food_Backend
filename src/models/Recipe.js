const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    // id name image description health_score steps
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(
        DataTypes.JSONB({
          number: DataTypes.INTEGER,
          step: DataTypes.STRING,
        })
      ),
      allowNull: false,
    },
  });
};
