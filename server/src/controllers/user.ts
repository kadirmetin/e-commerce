import { Request, Response } from "express";
import ProductModal from "../models/Product";
import UserModal from "../models/User";

const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Eksik veya hatalı id!" });
    }

    const user = await UserModal.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: "Bu ürün zaten favorilerinizde" });
    }

    const product = await ProductModal.findByIdAndUpdate(
      productId,
      {
        $inc: { favoriteCount: 1 },
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı" });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Favorileme yapılırken bir hata oluştu.", error });
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Eksik veya hatalı id!" });
    }

    const user = await UserModal.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    }

    const product = await ProductModal.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı" });
    }

    const index = user.favorites.indexOf(productId);
    if (index !== -1) {
      user.favorites.splice(index, 1);
      await user.save();

      const updatedProduct = await ProductModal.findOneAndUpdate(
        { _id: productId },
        { $inc: { favoriteCount: -1 } },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Ürün bulunamadı" });
      }

      res
        .status(200)
        .json({ success: true, message: "Product removed from favorites" });
    } else {
      res.status(400).json({ error: "Product is not in favorites" });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Favoriden çıkarma işlemi yapılırken bir hata oluştu.",
      error,
    });
  }
};

export { addFavorite, removeFavorite };
