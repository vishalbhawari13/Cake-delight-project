const express = require("express");

const router = express.Router();

const {
  createRating,
  getRatingsByCakeId,
  getAverageRating,
  getRatingById,
  updateRating,
  deleteRating,
} = require(
  "../controllers/ratingcontroller"
);


// Create rating
router.post(
  "/",
  createRating
);


// Get ratings for cake
router.get(
  "/cake/:cakeId",
  getRatingsByCakeId
);


// Get average rating
router.get(
  "/cake/:cakeId/average",
  getAverageRating
);


// Get rating by ID
router.get(
  "/:ratingId",
  getRatingById
);


// Update rating
router.put(
  "/:ratingId",
  updateRating
);


// Delete rating
router.delete(
  "/:ratingId",
  deleteRating
);


module.exports = router;