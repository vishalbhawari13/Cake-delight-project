require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/database");

const {
  connectRabbitMQ,
} = require("./config/rabbitmq");

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {

    // Connect MongoDB
    await connectDB();

    // Connect RabbitMQ
    await connectRabbitMQ();

    // Start Express
    app.listen(PORT, () => {
      console.log(
        `Order Service running on port ${PORT}`
      );
    });

  } catch (error) {

    console.error(
      "Failed to start Order Service:",
      error.message
    );

    process.exit(1);
  }
};

startServer();