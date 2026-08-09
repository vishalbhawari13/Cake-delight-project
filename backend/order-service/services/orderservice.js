const Order = require("../models/Order");

const createOrder = async (order) => {
  return await Order.create(order);
};

const getAllOrders = async () => {
  return await Order.find();
};

const getOrderById = async (id) => {
  return await Order.findById(id);
};

const updateStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateStatus,
};