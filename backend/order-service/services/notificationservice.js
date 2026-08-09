const axios = require("axios");

const sendNotification = async (notification) => {
  const response = await axios.post(
    `${process.env.NOTIFICATION_SERVICE_URL}/api/notifications`,
    notification
  );

  return response.data;
};

module.exports = {
  sendNotification,
};