const { Sequelize, DataTypes, Model } = require('sequelize')
const db = require('../db/connection')

class Cart extends Model {}

Cart.init(
  {
    state: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    modelName: 'Cart', // We need to choose the model name
  }
)

module.exports = Cart
