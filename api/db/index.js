const User = require("./UserModels");
const Product = require("./ProductModels");
const Cart = require("./CartModels");
const Order = require("./OrderModels");
const CartItem = require("./CartItemsModels");
const Category = require("./CategoryModels");

//associations

// User.hasMany(Cart)
// Cart.belongsTo(User)

// // Cart.hasMany(Product, { through: 'cart_product' })
// Product.belongsToMany(Cart, { through: 'cart_product' })
// Cart.belongsToMany(Product, { through: 'cart_product' })

// Cart.hasOne(Order)
// Order.belongsTo(Cart)

/////////////de repo
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Product);

User.hasMany(Cart);
// User.hasOne(Cart)
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});

Cart.hasOne(Order);
Order.belongsTo(Cart);

Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

// Order.hasOne(Cart)
// Cart.belongsTo(Order)

// Order.belongsTo(User)
// User.hasMany(Order)

// Order.belongsToMany(Product, {
//   through: 'cart_product',
// })
// Product.belongsToMany(Order, {
//   through: 'cart_product',
// })

module.exports = { User, Product, Order, Cart, CartItem, Category };
