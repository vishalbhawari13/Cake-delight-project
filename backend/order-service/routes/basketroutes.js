const express = require("express");

const router = express.Router();

const {
  addToBasket,
  getBasket,
  updateBasket,
  removeFromBasket,
  clearBasket,
} = require("../controllers/basketcontroller");


// Add cake to basket
router.post("/basket", addToBasket);


// Get basket
router.get("/basket", getBasket);


// Update basket quantity
router.put("/basket/:basketId", updateBasket);


// Remove basket item
router.delete(
  "/basket/:basketId",
  removeFromBasket
);


// Clear basket
router.delete("/basket", clearBasket);


module.exports = router;