const express = require("express");
const router = express.Router();

const {
  getAllFavorites,
  getFavoritesByUserId,
  getFavoritesByProductId,
  addFavorite,
  deleteFavorite,
} = require("../controllers/FavoritesController");

router.get("/getAll", getAllFavorites);
router.get("/getFavoritesByUserId/:userId", getFavoritesByUserId);
router.get("/getFavoritesByProductId/:productId", getFavoritesByProductId);
router.post("/add", addFavorite);
router.delete("/delete/:id", deleteFavorite);

module.exports = router;
