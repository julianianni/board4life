const express = require('express')
const router = express.Router()
const Cart = require('../db/CartModels')
const Product = require('../db/ProductModels')
const User = require('../db/UserModels')
const CartItems = require('../db/CartItemsModels')

//find all carts
router.get('/items', (req, res) => {
  CartItems.findAll().then((cartItems) => res.send(cartItems))
})

//crear un nuevo carrito asociado a un usuario
router.post('/newCart/:id', (req, res) => {
  console.log('ACA ESTA EL USUARIO-->', req.params.id)
  User.findByPk(req.params.id).then((user) => {
    user.createCart({ state: 'InProgress' }).then((data) => res.send(data))
  })
})
//

//agregando productos a un carrito de un usuario
router.post('/add', (req, res) => {
  let fetchedCart

  const { UserId, id, quantity } = req.body

  User.findByPk(UserId).then((user) => {
    return Cart.findOne({
      where: {
        UserId: UserId,
        state: 'InProgress',
      },
    })
      .then((cart) => {
        fetchedCart = cart
        return Product.findByPk(id)
      })

      .then((product) => {
        return fetchedCart.addProduct(product, {
          through: {
            quantity: quantity,
          },
        })
      })
      .then(() => {
        //definir con el front q mandar
        return fetchedCart.getProducts().then((cart) => res.send(cart))
      })
  })
})
//removiendo productos

router.delete('/remove', (req, res) => {
  let fetchedCart
  const { userId, productid } = req.body

  User.findByPk(userId).then((user) =>
    Cart.findOne({
      where: {
        UserId: userId,
        state: 'InProgress',
      },
    })
      .then((cart) => {
        fetchedCart = cart
        return cart.getProducts({
          where: {
            id: productid,
          },
        })
      })
      .then((product) => {
        fetchedCart.removeProduct(product).then(() => {
          res.send(fetchedCart)
        })
      })
  )
})

router.delete('/vaciarcarrito', (req, res) => {
  const { userId } = req.body
  console.log(req.body)
  let userCart

  User.findByPk(userId).then((user) =>
    Cart.findOne({
      where: {
        UserId: userId,
        state: 'InProgress',
      },
    })
      .then((cart) => {
        userCart = cart
        return cart.getProducts()
      })
      .then((products) =>
        userCart.removeProducts(products).then(() => res.sendStatus(200))
      )
  )
})

//obtener el carrito de un usuario

router.get('/todosloscarritos', (req, res) => {
  Cart.findAll().then((cart) => res.send(cart))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Cart.findAll({
    where: { UserId: id, state: 'InProgress' },
    include: Product,
  }).then((cart) => res.send(cart))
})

router.get('/mycart/:id', (req, res) => {
  const { id } = req.params
  Cart.findByPk(id, { include: Product })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(404))
})
module.exports = router
