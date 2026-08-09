const amqp = require("amqplib");

const EXCHANGE_NAME = "cake_delight_exchange";

const QUEUE_NAME = "notification_queue";

const ROUTING_KEY = "order.placed";

const connectRabbitMQ = async () => {
  try {

    // Connect to RabbitMQ
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL
    );

    // Create channel
    const channel =
      await connection.createChannel();


    // Create exchange
    await channel.assertExchange(
      EXCHANGE_NAME,
      "direct",
      {
        durable: true,
      }
    );


    // Create queue
    await channel.assertQueue(
      QUEUE_NAME,
      {
        durable: true,
      }
    );


    // Connect queue to exchange
    await channel.bindQueue(
      QUEUE_NAME,
      EXCHANGE_NAME,
      ROUTING_KEY
    );


    console.log("RabbitMQ Connected");

    console.log(
      "Notification Queue Ready"
    );


    // Consume messages
    channel.consume(
      QUEUE_NAME,
      async (message) => {

        if (!message) {
          return;
        }


        try {

          const event =
            JSON.parse(
              message.content.toString()
            );


          console.log(
            "Received Event:",
            event.eventType
          );


          console.log(
            "Order ID:",
            event.orderId
          );


          // Process notification
          await handleOrderPlaced(event);


          // Tell RabbitMQ message was successfully processed
          channel.ack(message);


        } catch (error) {

          console.error(
            "Message processing failed:",
            error.message
          );


          // Requeue message
          channel.nack(
            message,
            false,
            true
          );
        }
      }
    );

  } catch (error) {

    console.error(
      "RabbitMQ Connection Error:",
      error.message
    );

    throw error;
  }
};


// Process OrderPlaced event
const handleOrderPlaced = async (event) => {

  const NotificationService =
    require(
      "../services/notification.service"
    );


  await NotificationService.createNotification({

    orderId: event.orderId,

    customerName:
      event.customerName,

    email:
      event.email,

    phone:
      event.phone,

    message:
      "Your order has been placed successfully.",

    type: "EMAIL",

    status: "SENT",
  });


  console.log(
    `Notification created for order: ${event.orderId}`
  );
};


module.exports = {
  connectRabbitMQ,
};