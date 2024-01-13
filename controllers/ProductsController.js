const { imageUploader } = require("../extra/imageUploader");
const Product = require("../models/Products");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductByCategoryId = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const products = await Product.find({ categoryId: categoryId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const savedProduct = await Product.create({
      ...req.body,
    });
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const deletedProduct = await Product.findOneAndDelete({
      productId: productId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductByPrice = async (req, res) => {
  try {
    const price = parseFloat(req.params.price);
    const products = await Product.find({ price: price });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductByCategoryId,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductByPrice,
};
