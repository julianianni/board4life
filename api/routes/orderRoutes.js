const express = require('express')
const router = express.Router()
const Cart = require('../db/CartModels')
const Order = require('../db/OrderModels')
const User = require('../db/UserModels')
const Product = require('../db/ProductModels')
const main = require('../../src/utils/emailSent')

// router.get('/', (req, res) => {
//   Order.findAll({ include: Cart }).then((order) => res.send(order))
// })

router.get('/misordenes/:id', (req, res) => {
  const id = req.params.id
  Cart.findAll({ where: { UserId: id, state: 'completed' } })
    .then((carts) => {
      const resultArray = []
      for (let cart of carts) {
        resultArray.push(cart.getOrder())
      }
      return Promise.all(resultArray)
    })
    .then((data) => res.send(data))
})

//boton confirmar del frontEnd
router.post('/checkout', (req, res) => {
  let date = new Date()
  let currentUser
  const {
    userId,
    telephone,
    address,
    shipCost,
    paymentMethod,
    additionalInfo,
    user,
    mailInfo,
    cart,
  } = req.body

  // main(user, mailInfo, cart)

  User.findByPk(userId)
    .then((user) => {
      currentUser = user
      return Cart.findOne({
        where: {
          UserId: userId,
          state: 'InProgress',
        },
      })
    })
    .then((cart) => {
      //actualizar el stock
      cart.getProducts().then((products) => {
        let id, stock, quantityPurchased, newStock
        products.map((product) => {
          id = product.id
          stock = product.stock
          quantityPurchased = product.dataValues.CartItem.quantity
          newStock = stock - quantityPurchased
          Product.update(
            { stock: newStock },
            { where: { id: id }, returning: true }
          ).then((product) => {
            console.log('producto actualizado')
          })
        })
      })
      ////
      Order.create({
        telephone,
        address,
        shipCost,
        paymentMethod,
        additionalInfo,
        date,
      })
        .then((order) => order.setCart(cart))
        .then((order) => {
          cart.update({
            state: 'completed',
          })
          currentUser.createCart({ state: 'InProgress' })
          return order
        })
        .then((data) => res.send(data))
    })
})

module.exports = router
