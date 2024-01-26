const Carts = require("../models/Carts");

const getAllCarts = async (req, res) => {
  try {
    const data = await Carts.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCartsByUserId = async (req, res) => {
  try {
    const carts = await Carts.find({ userId: req.params.id });

    if (carts.length === 0) {
      return res.status(404).json({ msg: "No products added by this user" });
    }

    res.json(carts);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};

const addCart = async (req, res) => {
  try {
    const { userId, products, totalPrice } = req.body;

    const cart = new Carts({
      userId,
      products,
      totalPrice,
    });

    const savedCart = await cart.save();

    res.status(200).json({
      code: 200,
      message: "Cart added successfully",
      data: savedCart,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Cart not added successfully",
      error: err.message,
    });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const cart = await Carts.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      cart: cart,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error occurred while deleting cart",
      error: err,
    });
  }
};

const deleteCartsByUserId = async (req, res) => {
  try {
    const result = await Carts.deleteMany({ userId: req.params.userId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "All carts for the user deleted successfully",
        deletedCount: result.deletedCount,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No carts found for the user",
        deletedCount: result.deletedCount,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting carts",
      error: err.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // TODO: Make the necessary update in your cart model or database

    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart quantity",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCarts,
  getCartsByUserId,
  deleteCartById,
  deleteCartsByUserId,
  addCart,
  updateCartQuantity,
};
