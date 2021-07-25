const express = require("express");
const router = express.Router();
const Cart = require("../db/CartModels");
const Product = require("../db/ProductModels");
const User = require("../db/UserModels");
const CartItems = require("../db/CartItemsModels");
const Category = require("../db/CategoryModels");
const { route } = require("./adminRoutes");

/* ESTOY EN LA RUTA http://localhost:3001/api/category  */

router.get("/", (req, res) => {
  Category.findAll().then((category) => res.send(category));
});

router.post("/", (req, res) => {
  const categoryName = req.body.name;
  Category.findOrCreate({
    where: { name: categoryName },
    defaults: { name: categoryName },
  }).then((category) => {
    console.log(category[0]);
    res.sendStatus(200);
  });
});

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id).then((category) => res.send(category));
});

router.delete("/", (req, res) => {
  const categoriesRemove = req.body;
  categoriesRemove.map((category) => {
    Category.destroy({
      where: {
        id: category.id,
      },
    })
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err));
  });
});

//REVISAR  ivan
//  la info viene de src/utils/idex de la funcion updateCategoryfromBD()
router.put("/", (req, res) => {
  console.log("BODYYY->>>", req.body);
  Category.update(req.body, { where: { id: req.body.id } }).then((category) =>
    res.send(category)
  );
});

module.exports = router;
