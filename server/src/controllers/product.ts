import { Request, Response } from "express";
import CategoryModal from "../models/Category";
import ProductModal from "../models/Product";

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, desc, image, price, category } = req.body;

    if (!name || !desc || !image || !price || !category) {
      return res
        .status(400)
        .json({ message: "Lütfen bütün alanları doldurunuz." });
    }

    let categoryObject = await CategoryModal.findOne({ name: category });

    if (!categoryObject) {
      categoryObject = await CategoryModal.create({ name: category });
    }

    const newProduct = await ProductModal.create({
      name,
      desc,
      image,
      price,
      category: categoryObject._id,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Ürün başarıyla oluşturuldu.",
      productId: newProduct._id,
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Ürün oluşturulurken bir hata oluştu.", error });
  }
};

const getProductInfo = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    if (!productId || productId.length !== 24) {
      return res.status(400).json({ message: "Eksik veya hatalı ürün kodu!" });
    }

    const product = await ProductModal.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Hatalı ürün kodu!" });
    }

    return res.status(200).json({ product: product });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Ürün bilgileri getirilirken bir hata oluştu.", error });
  }
};

const getNewProducts = async (req: Request, res: Response) => {
  try {
    const newProducts = await ProductModal.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(newProducts);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

const getPopulerProducts = async (req: Request, res: Response) => {
  try {
    const populerProducts = await ProductModal.find()
      .sort({ favoriteCount: -1 })
      .limit(10);

    return res.status(200).json(populerProducts);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

export { addNewProduct, getNewProducts, getPopulerProducts, getProductInfo };
