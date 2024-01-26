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

    const imageURL = await imageUploader(req);

    if (!imageURL) {
      return res.status(400).json({
        success: false,
        message: "Error uploading image",
      });
    }

    const savedProduct = await Product.create({
      ...req.body,
      productImage: imageURL,
    });
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
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

const getProductById = async (req, res) => {
  try {
    const product = await Product.find({ productId: req.params.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductByGender = async (req, res) => {
  try {
    const gender = req.params.gender;
    const product = await Product.find({ gender: gender });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductByCategoryId,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByGender,
};
