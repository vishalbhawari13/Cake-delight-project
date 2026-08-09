const Notification = require("../models/Notification");

// Create notification
const createNotification = async (notificationData) => {
  const notification = await Notification.create(
    notificationData
  );

  return notification;
};


// Get all notifications
const getAllNotifications = async () => {
  return await Notification.find().sort({
    createdAt: -1,
  });
};


// Get notification by ID
const getNotificationById = async (id) => {
  return await Notification.findById(id);
};


// Get notifications by order ID
const getNotificationsByOrderId = async (orderId) => {
  return await Notification.find({
    orderId: orderId,
  }).sort({
    createdAt: -1,
  });
};


// Delete notification
const deleteNotification = async (id) => {
  return await Notification.findByIdAndDelete(id);
};


module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByOrderId,
  deleteNotification,
};