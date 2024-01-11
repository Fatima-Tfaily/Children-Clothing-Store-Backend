const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  productId: {
    type: Number,
  },
});
const Favorites = mongoose.model("Favorites", favoritesSchema);
module.exports = Favorites;
