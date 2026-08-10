const amqp = require("amqplib");

const {
  sendOrderConfirmation,
} = require("../services/mailservice");


const EXCHANGE_NAME =
  "cake_delight_exchange";

const QUEUE_NAME =
  "notification_queue";

const ROUTING_KEY =
  "order.placed";


const connectRabbitMQ = async () => {

  try {

    // Connect RabbitMQ
    const connection =
      await amqp.connect(
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


    // Bind queue
    await channel.bindQueue(
      QUEUE_NAME,
      EXCHANGE_NAME,
      ROUTING_KEY
    );


    console.log(
      "RabbitMQ Connected"
    );

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


          // Send real email
          await sendOrderConfirmation({

            email: event.email,

            customerName:
              event.customerName,

            orderId:
              event.orderId,

            items:
              event.items,

            totalAmount:
              event.totalAmount,
          });


          console.log(
            `Email sent for order: ${event.orderId}`
          );


          // Save notification
          const NotificationService =
            require(
              "../services/notificationservice"
            );


          await NotificationService
            .createNotification({

              orderId:
                event.orderId,

              customerName:
                event.customerName,

              email:
                event.email,

              phone:
                event.phone,

              message:
                "Order confirmation email sent successfully.",

              type:
                "EMAIL",

              status:
                "SENT",
            });


          // Acknowledge message
          channel.ack(message);


        } catch (error) {

          console.error(
            "Notification processing failed:",
            error.message
          );


          /*
           * Message will return to queue
           * and can be processed again.
           */
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


module.exports = {
  connectRabbitMQ,
};