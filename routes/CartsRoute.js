const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  getCartsByUserId,
  deleteCartById,
  deleteCartsByUserId,
  addCart,
} = require("../controllers/CartsController");

router.get("/getAll", getAllCarts);
router.get("/getCartsByUserId/:id", getCartsByUserId);
router.post("/add", addCart);
router.delete("/delete/:id", deleteCartById);
router.delete("/deleteByUserId/:userId", deleteCartsByUserId);

module.exports = router;
