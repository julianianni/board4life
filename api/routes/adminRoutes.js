const router = require('express').Router()
const Cart = require('../db/CartModels')
const Product = require('../db/ProductModels')
const User = require('../db/UserModels')
const CartItems = require('../db/CartItemsModels')
const Order = require('../db/OrderModels')
const Category = require('../db/CategoryModels')
const jwt = require('jsonwebtoken')

//authentication middleware
const authAdmin = (req, res, next) => {
  const token = req.cookies.access

  if (token) {
    jwt.verify(token, '$2b$10$/skdhli/rZNMa9uRsSOdX.', (err, data) => {
      if (err) return res.sendStatus(403)
      if (data.isAdmin) next()
      else res.sendStatus(401)
    })
  } else {
    res.sendStatus(401)
  }
}

router.use(authAdmin)
//find all carts
//modificado por ivan agregue el include para traer las categorias
router.get('/allproducts', (req, res) => {
  Product.findAll({ include: Category }).then((products) => res.send(products))
})
router.get('/allusers', (req, res) => {
  User.findAll().then((products) => res.send(products))
})
router.put('/update', (req, res) => {
  Product.update(req.body, { where: { id: req.body.id } }).then((products) =>
    res.send(products)
  )
})
router.put('/updateuser', (req, res) => {
  User.update(req.body, { where: { id: req.body.id } }).then((users) =>
    res.send(users)
  )
})

//modificado por ivan
router.post('/add', (req, res) => {
  const { categorias } = req.body
  Product.create(req.body).then((product) => {
    categorias.map((categoria) => {
      Category.findOne({ where: { name: categoria } }).then((category) => {
        product.addCategory(category)
      })
    })
    res.send(product)
  })
})
router.post('/adduser', (req, res) => {
  User.create(req.body).then((product) => res.send(product))
})
router.delete('/delete', (req, res) => {
  const productsToRemove = req.body

  productsToRemove.map((product) =>
    Product.destroy({ where: { id: product.id } })
      .then((product) => res.sendStatus(200))
      .catch((err) => console.log(err))
  )
})
router.delete('/deleteuser', (req, res) => {
  const usersToRemove = req.body
  usersToRemove.map((user) =>
    User.destroy({ where: { id: user.id } })
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err))
  )
})

router.get('/getorders', (req, res) => {
  Order.findAll().then((order) => res.send(order))
})
router.delete('/deleteorder', (req, res) => {
  const orderToRemove = req.body
  orderToRemove.map((order) =>
    Order.destroy({ where: { id: order.id } })
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err))
  )
})
router.put('/updateorder', (req, res) => {
  Order.update(req.body, { where: { id: req.body.id } }).then((orders) =>
    res.send(orders)
  )
})

router.post('/addorder', (req, res) => {
  Order.create(req.body).then((orders) => res.send(orders))
})

module.exports = router
