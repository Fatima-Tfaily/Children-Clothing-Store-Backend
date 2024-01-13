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

// Get a Category by ID
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

const getCategoryByGender = async (req, res) => {
  try {
    const gender = parseInt(req.params.gender);
    const category = await Category.find({ gender: gender });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update category
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

// Delete a category
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
    const { categoryName, categoryImage, gender } = req.body;

    const existingCategory = await Category.find({ categoryName });
    if (!existingCategory) {
      return res.status(400).json({ message: "Category Name already exists" });
    }

    const newCategory = new Category({
      categoryName,
      categoryImage,
      gender,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByID,
  getCategoryByGender,
  addCategory,
  deleteCategory,
  updateCategory,
};
