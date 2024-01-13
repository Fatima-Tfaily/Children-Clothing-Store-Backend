const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productsSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: false,
    unique: true,
  },
  categoryId: {
    type: Number,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stocks: [
    {
      size: String,
      quantity: Number,
    },
  ],
});

productsSchema.pre("save", async function (next) {
  try {
    if (!this.productId || this.productId === null) {
      const existingProducts = await this.constructor.find({
        productId: { $exists: true },
      });
      const lastProductId =
        existingProducts.length > 0
          ? existingProducts[existingProducts.length - 1].productId
          : 0;
      this.productId = lastProductId + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
