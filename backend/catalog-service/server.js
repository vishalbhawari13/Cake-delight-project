require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5001;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Catalog Service running on port ${PORT}`);
});