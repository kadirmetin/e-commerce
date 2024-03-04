import { Request, Response } from "express";
import CategoryModal from "../models/Category";
import ProductModal from "../models/Product";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModal.find().sort({
      name: 1,
    });

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const getCategoriesProduct = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return res
        .status(400)
        .json({ message: "Eksik veya hatalı kategori kodu!" });
    }

    const category = await CategoryModal.findById(categoryId);

    if (!category) {
      return res.status(400).json({ message: "Hatalı kategori kodu!" });
    }

    const products = await ProductModal.find({
      category: categoryId,
    }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ categoryName: category.name, products: products });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

export { getAllCategories, getCategoriesProduct };
