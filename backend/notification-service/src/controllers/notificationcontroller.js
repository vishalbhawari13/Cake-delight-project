const NotificationService = require("../services/notificationservice");


// Create Notification
const createNotification = async (req, res, next) => {
  try {
    const {
      orderId,
      customerName,
      email,
      phone,
      message,
      type,
    } = req.body;


    // Validate required fields
    if (
      !orderId ||
      !customerName ||
      !email ||
      !phone ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "orderId, customerName, email, phone and message are required",
      });
    }


    // Create notification
    const notification =
      await NotificationService.createNotification({
        orderId,
        customerName,
        email,
        phone,
        message,
        type: type || "EMAIL",
        status: "SENT",
      });


    res.status(201).json({
      success: true,
      message: "Notification sent successfully",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Notifications
const getAllNotifications = async (req, res, next) => {
  try {
    const notifications =
      await NotificationService.getAllNotifications();


    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};


// Get Notification By ID
const getNotificationById = async (req, res, next) => {
  try {
    const notification =
      await NotificationService.getNotificationById(
        req.params.notificationId
      );


    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }


    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};


// Get Notifications By Order ID
const getNotificationsByOrderId = async (
  req,
  res,
  next
) => {
  try {
    const notifications =
      await NotificationService.getNotificationsByOrderId(
        req.params.orderId
      );


    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};


// Delete Notification
const deleteNotification = async (req, res, next) => {
  try {
    const notification =
      await NotificationService.deleteNotification(
        req.params.notificationId
      );


    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByOrderId,
  deleteNotification,
};