import { Request, Response } from "express";
import CategoryModal from "../models/Category";
import OrderModal from "../models/Order";
import ProductModal from "../models/Product";
import UserModal from "../models/User";

const getTotalProductsCount = async (req: Request, res: Response) => {
  try {
    const totalProductCount = await ProductModal.countDocuments();

    return res.status(200).json({ totalProductCount });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const getTotalCategoryCount = async (req: Request, res: Response) => {
  try {
    const totalCategoryCount = await CategoryModal.countDocuments();

    return res.status(200).json({ totalCategoryCount });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const getTotalOrderCount = async (req: Request, res: Response) => {
  try {
    const totalOrderCount = await OrderModal.countDocuments();

    return res.status(200).json({ totalOrderCount });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const getTotalUserCount = async (req: Request, res: Response) => {
  try {
    const totalUserCount = await UserModal.countDocuments();

    return res.status(200).json({ totalUserCount });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

export {
  getTotalCategoryCount,
  getTotalOrderCount,
  getTotalProductsCount,
  getTotalUserCount,
};
