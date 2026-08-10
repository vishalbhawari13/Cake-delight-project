const {
  getChannel,
  EXCHANGE_NAME,
} = require("../config/rabbitmq");

const publishOrderPlaced = (order) => {
  const channel = getChannel();

  const event = {
    eventType: "ORDER_PLACED",

    orderId: order._id.toString(),

    userId: order.userId,

    customerName: order.customerName,

    email: order.email,

    phone: order.phone,

    address: order.address,

    items: order.items,

    totalAmount: order.totalAmount,

    status: order.status,

    createdAt: order.createdAt,
  };

  const message = Buffer.from(
    JSON.stringify(event)
  );

  channel.publish(
    EXCHANGE_NAME,
    "order.placed",
    message,
    {
      persistent: true,
      contentType: "application/json",
    }
  );

  console.log(
    `ORDER_PLACED event published: ${order._id}`
  );
};

module.exports = {
  publishOrderPlaced,
};