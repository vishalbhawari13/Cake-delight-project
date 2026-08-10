require("dotenv").config();

const app = require("./app");

const connectDB =
  require("./config/database");

const {
  connectRabbitMQ,
} = require("./config/rabbitmq");

const {
  verifyMailConnection,
} = require("./services/mailservice");


const PORT =
  process.env.PORT || 5004;


const startServer = async () => {

  try {

    // MongoDB
    await connectDB();


    // Gmail
    await verifyMailConnection();


    // RabbitMQ
    await connectRabbitMQ();


    // Start server
    app.listen(PORT, () => {

      console.log(
        `Notification Service running on port ${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Failed to start Notification Service:",
      error.message
    );

    process.exit(1);
  }
};


startServer();