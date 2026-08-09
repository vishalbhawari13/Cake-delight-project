const express = require("express");

const router = express.Router();

const {
  checkout,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/ordercontroller");


// Checkout
router.post("/checkout", checkout);


// Get all orders
router.get("/", getAllOrders);


// Get order by ID
router.get("/:orderId", getOrderById);


// Update order status
router.put(
  "/:orderId/status",
  updateOrderStatus
);


module.exports = router;