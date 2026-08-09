require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/database");

const PORT = process.env.PORT || 5004;


// Connect MongoDB
connectDB();


// Start server
app.listen(PORT, () => {
  console.log(
    `Notification Service running on port ${PORT}`
  );
});