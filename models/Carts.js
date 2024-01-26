const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: { type: Number },
});
const Carts = mongoose.model("Carts", cartsSchema);
module.exports = Carts;
