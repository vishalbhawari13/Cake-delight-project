const express = require("express");

const router = express.Router();

const {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByOrderId,
  deleteNotification,
} = require("../controllers/notificationcontroller");


// Create notification
router.post("/", createNotification);


// Get all notifications
router.get("/", getAllNotifications);


// Get notification by order ID
router.get(
  "/order/:orderId",
  getNotificationsByOrderId
);


// Get notification by ID
router.get(
  "/:notificationId",
  getNotificationById
);


// Delete notification
router.delete(
  "/:notificationId",
  deleteNotification
);


module.exports = router;