const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  products: [
    {
      productId: Number,
      quantity: Number,
      price: Number,
    },
  ],
  adress: { type: String },
  totalPrice: { type: Number },
  status: { type: String },
});
const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
