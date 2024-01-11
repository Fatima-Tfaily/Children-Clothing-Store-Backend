const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  deleteOrdersByUserId,
} = require("../controllers/OrdersController");

router.get("/getAllOrders", getAllOrders);
router.get("/getOrdersByUserId/:userId", getOrdersByUserId);
router.get("/getOrdersById/:id", getOrderById);
router.post("/add", addOrder);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);
router.delete("/deleteByUserId/:userId", deleteOrdersByUserId);

module.exports = router;
