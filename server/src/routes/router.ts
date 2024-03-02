import express from "express";
import { login, register } from "../controllers/auth";
import {
  addNewProduct,
  getNewProducts,
  getPopulerProducts,
  getProductInfo,
} from "../controllers/product";
import { addFavorite, removeFavorite } from "../controllers/user";
import { isAdmin, verifyToken } from "../middleware/authMid";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/product/info/:productId", getProductInfo);
router.get("/product/new", getNewProducts);
router.get("/product/popular", getPopulerProducts);

router.post("/product/addNewProduct", verifyToken, isAdmin, addNewProduct);

router.post("/user/addFavorite", verifyToken, addFavorite);
router.post("/user/removeFavorite", verifyToken, removeFavorite);

export { router };
