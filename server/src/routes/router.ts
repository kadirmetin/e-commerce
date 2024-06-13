import express from "express";
import { login, register } from "../controllers/auth";
import { getAllBanners } from "../controllers/banner";
import {
  getAllCategories,
  getCategoriesProduct,
} from "../controllers/category";
import {
  addNewProduct,
  getNewProducts,
  getPopulerProducts,
  getProductInfo,
} from "../controllers/product";
import {
  getTotalCategoryCount,
  getTotalOrderCount,
  getTotalProductsCount,
  getTotalUserCount,
} from "../controllers/static";
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

router.get("/category/getAllCategories", getAllCategories);
router.get("/category/info/:categoryId", getCategoriesProduct);

router.get("/getAllBanners", getAllBanners);

router.get("/static/getTotalProductsCount", getTotalProductsCount);
router.get("/static/getTotalCategoryCount", getTotalCategoryCount);
router.get("/static/getTotalOrderCount", getTotalOrderCount);
router.get("/static/getTotalUserCount", getTotalUserCount);

export { router };
