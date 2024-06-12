import { Request, Response } from "express";
import CategoryModal from "../models/Category";
import ProductModal from "../models/Product";

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

export { getTotalCategoryCount, getTotalProductsCount };
