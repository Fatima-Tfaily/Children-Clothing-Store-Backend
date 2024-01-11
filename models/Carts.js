const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  products: [
    {
      productId: Number,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: { type: Number },
});
const Carts = mongoose.model("Carts", cartsSchema);
module.exports = Carts;
