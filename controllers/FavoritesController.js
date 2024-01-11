const Favorites = require("../models/Favorites");

const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorites.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFavoritesByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const favorites = await Favorites.find({ userId: userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFavoritesByProductId = async (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const favorites = await Favorites.find({ productId: productId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const favorite = new Favorites({
      userId,
      productId,
    });

    const savedFavorite = await favorite.save();

    res.status(201).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const deletedFavorite = await Favorites.findOneAndDelete({
      _id: favoriteId,
    });

    if (!deletedFavorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.json({
      message: "Favorite deleted successfully",
      deletedFavorite,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllFavorites,
  getFavoritesByUserId,
  getFavoritesByProductId,
  addFavorite,
  deleteFavorite,
};
