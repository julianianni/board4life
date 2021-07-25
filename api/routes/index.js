const router = require("express").Router();

router.use("/cart", require("./cartRoutes"));
router.use("/order", require("./orderRoutes"));
router.use("/products", require("./ProductRoutes"));
router.use("/auth", require("./auth"));
router.use("/private", require("./private"));
router.use("/admin", require("./adminRoutes"));
router.use("/category", require("./categoryRoute"));

module.exports = router;
