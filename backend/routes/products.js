const express = require("express");
const {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
} = require("../controllers/product");

const router = express.Router();

router.get("/products", allProducts);
router.get("/products/:id", detailProduct);
router.post("/products", createProduct);
router.post("/products/reviews", createProductReview);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

module.exports = router;
