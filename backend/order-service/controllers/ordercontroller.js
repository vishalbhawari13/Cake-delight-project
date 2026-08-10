const BasketService = require("../services/basketservice");
const OrderService = require("../services/orderservice");

const calculateTotal = require("../utils/calculateTotal");

const {
  publishOrderPlaced,
} = require("../services/eventservice");


// Checkout
const checkout = async (req, res, next) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
    } = req.body;

    // Validate customer details
    if (!customerName || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message:
          "customerName, email, phone and address are required",
      });
    }

    // Get basket
    const basket = await BasketService.getBasket();

    // Check basket
    if (!basket || basket.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Basket is empty",
      });
    }

    // Calculate total
    const totalAmount = calculateTotal(basket);

    // Prepare order items
    const orderItems = basket.map((item) => ({
      cakeId: item.cakeId,
      cakeName: item.cakeName,
      price: item.price,
      quantity: item.quantity,
    }));

    // Create order
    const order = await OrderService.createOrder({
      userId: "user1",

      customerName,

      email,

      phone,

      address,

      items: orderItems,

      totalAmount,

      status: "PLACED",
    });

    
    // Publish RabbitMQ event
    publishOrderPlaced(order);

    // Clear basket
    await BasketService.clearBasket();

    // Return order
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};


// Get Order By ID
const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(
      req.params.orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


// Update Order Status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "PLACED",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await OrderService.updateStatus(
      req.params.orderId,
      status
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  checkout,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};