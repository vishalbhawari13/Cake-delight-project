const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const basketRoutes = require("./routes/basketroutes");
const orderRoutes = require("./routes/orderroutes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    service: "Order Service",
    status: "Running",
  });
});

app.use("/api/orders", basketRoutes);

app.use("/api/orders", orderRoutes);

app.use(errorHandler);

module.exports = app;