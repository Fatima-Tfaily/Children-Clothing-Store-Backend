const Orders = require("../models/Orders");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await Orders.find({ userId: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  try {
    const { user, products, totalPrice } = req.body;

    const order = new Orders({
      user,
      products,
      totalPrice,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Orders.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Orders.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOrdersByUserId = async (req, res) => {
  try {
    const result = await Orders.deleteMany({ userId: req.params.userId });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "All orders for the user deleted successfully",
        deletedCount: result.deletedCount,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No orders found for the user",
        deletedCount: result.deletedCount,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting orders",
      error: err.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  deleteOrdersByUserId,
};
