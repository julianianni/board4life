const { Sequelize, DataTypes, Model } = require('sequelize')
const db = require('../db/connection')

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: ['https://cdn.browshot.com/static/images/not-found.png'],
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    modelName: 'Product', // We need to choose the model name
  }
)

module.exports = Product
