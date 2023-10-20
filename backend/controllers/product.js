const Product = require("../models/product");
const ProductFilter = require("../utils/productFilter");
const cloudinary = require("cloudinary");

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
    console.error(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const product = await Product.create(req.body);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error. Unable to create the product.",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
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

const createProductReview = async (req, res, next) => {
  const { productId, comment, rating } = req.body;

  try {
    if (!productId || !comment || !rating) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      comment,
      rating: Number(rating),
    };

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
    }

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Review added" });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error. Unable to add the review.",
    });
  }
};

module.exports = {
  allProducts,
  detailProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
