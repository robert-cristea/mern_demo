const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    // Model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };

  const options = {
    // Options
    timestamps: true,
    underscrored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  return sequelize.define("book", attributes, options);
}
