const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const gatewayRoutes = require(
  "./routes/gatewayroutes"
);

const errorHandler = require(
  "./middleware/error.middleware"
);


const app = express();


// ===============================
// Middleware
// ===============================

app.use(cors());

//app.use(express.json());

app.use(morgan("dev"));


// ===============================
// Gateway Health Check
// ===============================

app.get("/", (req, res) => {

  res.json({
    service: "Cake Delight API Gateway",
    status: "Running",
    port: process.env.PORT,
  });

});


// ===============================
// Gateway Routes
// ===============================

app.use(
  "/api",
  gatewayRoutes
);


// ===============================
// Error Handler
// ===============================

app.use(errorHandler);


module.exports = app;