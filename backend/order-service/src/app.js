const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const ratingRoutes = require(
  "./routes/ratingroutes"
);

const errorHandler = require(
  "./middleware/error.middleware"
);


const app = express();


// Middleware
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));


// Health check
app.get("/", (req, res) => {

  res.json({
    service: "Rating Service",
    status: "Running",
  });

});


// Rating routes
app.use(
  "/api/ratings",
  ratingRoutes
);


// Error handler
app.use(errorHandler);


module.exports = app;