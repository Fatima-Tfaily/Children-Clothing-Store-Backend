const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      price: Number,
    },
  ],
  address: { type: String },
  totalPrice: { type: Number },
  status: { type: String },
});

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
