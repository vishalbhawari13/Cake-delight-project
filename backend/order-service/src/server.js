require("dotenv").config();

const app = require("./app");

const connectDB = require(
  "./config/database"
);


const PORT =
  process.env.PORT || 5003;


const startServer = async () => {

  try {

    await connectDB();


    app.listen(
      PORT,
      () => {

        console.log(
          `Rating Service running on port ${PORT}`
        );

      }
    );

  } catch (error) {

    console.error(
      "Failed to start Rating Service:",
      error.message
    );

    process.exit(1);
  }
};


startServer();