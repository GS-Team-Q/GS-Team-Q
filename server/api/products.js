const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeeperMiddleware");

// GET /products - fetches all products in database
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// POST for adding product
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    if (user && user.isAdmin === true) {
      const product = await Product.create(req.body.product);
      res.send(product);
    } else next();
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(`${req.params.id}`);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:productID", async function (req, res, next) {
  try {
    const user = await User.findByToken(req.body.token);
    if (user && user.isAdmin) {
      const product = await Product.findByPk(req.params.productID);
      const result = await product.update(req.body);
      res.send(result);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:productID", async function (req, res, next) {
  try {
    const user = await User.findByToken(req.body.token);
    if (user && user.isAdmin) {
      const product = await Product.findByPk(req.params.productID);
      const result = await product.destroy();
      res.send(result);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
