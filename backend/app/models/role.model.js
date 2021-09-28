const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  };

  const options = {
    // Options
    timestamps: true,
    underscrored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  return sequelize.define("role", attributes, options);
}
