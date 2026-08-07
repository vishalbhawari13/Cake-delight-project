const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const catalogRoutes = require("./routes/catalogroutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.json({
    service: "Catalog Service",
    status: "Running",
  });
});

// Routes
app.use("/api/catalog", catalogRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;