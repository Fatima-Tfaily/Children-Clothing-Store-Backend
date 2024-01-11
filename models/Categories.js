const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    require: true,
    unique: true,
  },
  categoryName: {
    type: String,
  },
  categoryImage: { type: String },
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
