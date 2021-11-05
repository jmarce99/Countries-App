const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      difficulty:{
        type:DataTypes.ENUM("1","2","3","4","5")
        },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season:{    
        type:DataTypes.ENUM("winter","summer","spring","fall"),
        allowNull: false,
        },
    },
    {
      timestamps: false,
    }
  );
};
