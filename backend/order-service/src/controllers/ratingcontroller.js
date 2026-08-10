const RatingService = require(
  "../services/ratingservice"
);


// Create Rating
const createRating = async (
  req,
  res,
  next
) => {

  try {

    const {
      cakeId,
      userId,
      rating,
      review,
    } = req.body;


    // Validate required fields
    if (
      !cakeId ||
      !userId ||
      rating === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "cakeId, userId and rating are required",
      });
    }


    // Validate rating
    if (
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be a number between 1 and 5",
      });
    }


    // Check if user already rated this cake
    const existingRatings =
      await RatingService.getRatingsByCakeId(
        cakeId
      );


    const alreadyRated =
      existingRatings.find(
        (item) =>
          item.userId === userId
      );


    if (alreadyRated) {
      return res.status(409).json({
        success: false,
        message:
          "You have already rated this cake. Update your existing rating instead.",
      });
    }


    // Create rating
    const ratingData =
      await RatingService.createRating({

        cakeId,

        userId,

        rating,

        review: review || "",
      });


    res.status(201).json({
      success: true,
      message:
        "Rating submitted successfully",
      data: ratingData,
    });

  } catch (error) {

    next(error);
  }
};


// Get ratings by cake
const getRatingsByCakeId = async (
  req,
  res,
  next
) => {

  try {

    const ratings =
      await RatingService.getRatingsByCakeId(
        req.params.cakeId
      );


    res.status(200).json({
      success: true,

      count: ratings.length,

      data: ratings,
    });

  } catch (error) {

    next(error);
  }
};


// Get average rating
const getAverageRating = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await RatingService.getAverageRating(
        req.params.cakeId
      );


    res.status(200).json({
      success: true,

      data: result,
    });

  } catch (error) {

    next(error);
  }
};


// Get rating by ID
const getRatingById = async (
  req,
  res,
  next
) => {

  try {

    const rating =
      await RatingService.getRatingById(
        req.params.ratingId
      );


    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }


    res.status(200).json({
      success: true,

      data: rating,
    });

  } catch (error) {

    next(error);
  }
};


// Update rating
const updateRating = async (
  req,
  res,
  next
) => {

  try {

    const {
      rating,
      review,
    } = req.body;


    // Validate rating
    if (
      rating !== undefined &&
      (
        typeof rating !== "number" ||
        rating < 1 ||
        rating > 5
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be a number between 1 and 5",
      });
    }


    const updatedRating =
      await RatingService.updateRating(
        req.params.ratingId,
        {
          ...(rating !== undefined && {
            rating,
          }),

          ...(review !== undefined && {
            review,
          }),
        }
      );


    if (!updatedRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }


    res.status(200).json({
      success: true,

      message:
        "Rating updated successfully",

      data: updatedRating,
    });

  } catch (error) {

    next(error);
  }
};


// Delete rating
const deleteRating = async (
  req,
  res,
  next
) => {

  try {

    const deletedRating =
      await RatingService.deleteRating(
        req.params.ratingId
      );


    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }


    res.status(200).json({
      success: true,

      message:
        "Rating deleted successfully",
    });

  } catch (error) {

    next(error);
  }
};


module.exports = {
  createRating,
  getRatingsByCakeId,
  getAverageRating,
  getRatingById,
  updateRating,
  deleteRating,
};