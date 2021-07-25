const { Sequelize, DataTypes, Model } = require('sequelize')
const db = require('../db/connection')

class CartItem extends Model {}

CartItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    modelName: 'CartItem', // We need to choose the model name
  }
)

module.exports = CartItem
