const db = require("../config/db");
const { imageUploader } = require("../extra/imageUploader");
const Category = require("../models/Categories");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryByID = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const category = await Category.findOne({ categoryId: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updatedCategory = await Category.findOneAndUpdate(
      { categoryId: categoryId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category updated successfully", updatedCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findOneAndDelete({
      categoryId: categoryId,
    });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully", deletedCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCategory = async (req, res) => {
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

    const category = await Category.create({
      ...req.body,
      categoryImage: imageURL,
    });
    res.status(200).json({
      success: true,
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(400).json({
      success: false,
      message: "Category not added successfully",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByID,
  addCategory,
  deleteCategory,
  updateCategory,
};
