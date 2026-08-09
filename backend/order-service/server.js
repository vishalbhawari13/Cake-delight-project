require("dotenv").config();

const app = require("./app");

const connectDB = require("./config/database");

connectDB();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});