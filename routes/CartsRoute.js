const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  getCartsByUserId,
  deleteCartById,
  deleteCartsByUserId,
  addCart,
  updateCartQuantity,
} = require("../controllers/CartsController");

router.get("/getAll", getAllCarts);
router.get("/getCartsByUserId/:id", getCartsByUserId);
router.post("/add", addCart);
router.delete("/delete/:id", deleteCartById);
router.delete("/deleteByUserId/:userId", deleteCartsByUserId);
router.put("/updateQuantity/:userId", updateCartQuantity);

module.exports = router;
