const amqp = require("amqplib");

let channel = null;

const EXCHANGE_NAME = "cake_delight_exchange";

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL
    );

    channel = await connection.createChannel();

    await channel.assertExchange(
      EXCHANGE_NAME,
      "direct",
      {
        durable: true,
      }
    );

    console.log("RabbitMQ Connected");

  } catch (error) {
    console.error(
      "RabbitMQ Connection Error:",
      error.message
    );

    throw error;
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel is not initialized"
    );
  }

  return channel;
};

module.exports = {
  connectRabbitMQ,
  getChannel,
  EXCHANGE_NAME,
};