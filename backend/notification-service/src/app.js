const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notificationRoutes = require("./routes/notificationroutes");

const errorHandler = require("./middleware/error.middleware");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));


// Health check
app.get("/", (req, res) => {
  res.json({
    service: "Notification Service",
    status: "Running",
  });
});


// Notification routes
app.use(
  "/api/notifications",
  notificationRoutes
);


// Error handler
app.use(errorHandler);


module.exports = app;