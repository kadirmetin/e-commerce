const express = require("express");
const {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  adminProducts,
} = require("../controllers/product");
const {
  authenticationMid,
  adminAuthenticationMid,
} = require("../middleware/auth");

const router = express.Router();

router.get("/products", allProducts);
router.get(
  "/admin/products",
  authenticationMid,
  adminAuthenticationMid("admin"),
  adminProducts
);
router.get("/products/:id", detailProduct);
router.post(
  "/products",
  authenticationMid,
  adminAuthenticationMid("admin"),
  createProduct
);
router.post("/products/reviews", authenticationMid, createProductReview);
router.delete(
  "/products/:id",
  authenticationMid,
  adminAuthenticationMid("admin"),
  deleteProduct
);
router.put(
  "/products/:id",
  authenticationMid,
  adminAuthenticationMid("admin"),
  updateProduct
);

module.exports = router;
