const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db/connection");

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    modelName: "Category", // We need to choose the model name
  }
);

module.exports = Category;
