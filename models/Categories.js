const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: false,
    unique: true,
  },
  categoryName: {
    type: String,
  },
  categoryImage: { type: String },
});

categoriesSchema.pre("save", async function (next) {
  try {
    if (!this.categoryId || this.categoryId === null) {
      const existingCategories = await this.constructor.find({
        categoryId: { $exists: true },
      });
      const lastCategoryId =
        existingCategories.length > 0
          ? existingCategories[existingCategories.length - 1].categoryId
          : 0;
      this.categoryId = lastCategoryId + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
