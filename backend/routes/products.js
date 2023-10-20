const express = require("express");
const {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", detailProduct);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;
