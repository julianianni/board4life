const { Sequelize, DataTypes, Model } = require('sequelize')
const db = require('../db/connection')

class Order extends Model {}

Order.init(
  {
    telephone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'pendingShipping',
    },
    shipCost: {
      type: DataTypes.INTEGER,
      defaultValue: 500,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    additionalInfo: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db, // We need to pass the connection instance
    modelName: 'Order', // We need to choose the model name
  }
)

module.exports = Order
