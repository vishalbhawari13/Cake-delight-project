const Rating = require("../models/Rating");


// Create Rating
const createRating = async (ratingData) => {
  return await Rating.create(ratingData);
};


// Get all ratings for a cake
const getRatingsByCakeId = async (cakeId) => {
  return await Rating.find({
    cakeId: cakeId,
  }).sort({
    createdAt: -1,
  });
};


// Get rating by ID
const getRatingById = async (ratingId) => {
  return await Rating.findById(ratingId);
};


// Update rating
const updateRating = async (
  ratingId,
  updateData
) => {
  return await Rating.findByIdAndUpdate(
    ratingId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};


// Delete rating
const deleteRating = async (ratingId) => {
  return await Rating.findByIdAndDelete(
    ratingId
  );
};


// Calculate average rating
const getAverageRating = async (cakeId) => {

  const result = await Rating.aggregate([
    {
      $match: {
        cakeId: cakeId,
      },
    },

    {
      $group: {
        _id: "$cakeId",

        averageRating: {
          $avg: "$rating",
        },

        totalRatings: {
          $sum: 1,
        },
      },
    },
  ]);


  if (result.length === 0) {
    return {
      cakeId: cakeId,
      averageRating: 0,
      totalRatings: 0,
    };
  }


  return {
    cakeId: cakeId,

    averageRating: Number(
      result[0].averageRating.toFixed(1)
    ),

    totalRatings:
      result[0].totalRatings,
  };
};


module.exports = {
  createRating,
  getRatingsByCakeId,
  getRatingById,
  updateRating,
  deleteRating,
  getAverageRating,
};