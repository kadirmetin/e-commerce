const Product = require("../models/product");
const ProductFilter = require("../utils/productFilter");

const allProducts = async (req, res) => {
  try {
    const resultPerPage = 10;
    const productFilter = new ProductFilter(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await productFilter.query;

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ products });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

const detailProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ products });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     message:
    //       "Access denied. You need admin privileges to create a product.",
    //   });
    // }

    const product = await Product.create(req.body);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error. Unable to create the product.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     message:
    //       "Access denied. You need admin privileges to create a product.",
    //   });
    // }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({
    //     message:
    //       "Access denied. You need admin privileges to create a product.",
    //   });
    // }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(500).json({ message: "Failed to update the product" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error. Unable to update the product.",
    });
  }
};

module.exports = {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
