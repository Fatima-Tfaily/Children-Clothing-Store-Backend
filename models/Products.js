const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productsSchema = new mongoose.Schema({
  productId: {
    type: Number,
    require: true,
    unique: true,
  },
  categoryId: {
    type: Number,
  },
  productName: {
    type: String,
    require: true,
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
  discountedPourcentage: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  stocks: [
    {
      size: String,
      quantity: Number,
    },
  ],
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
