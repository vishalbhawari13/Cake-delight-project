const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    cakeId: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


// One user can rate one cake only once
ratingSchema.index(
  {
    cakeId: 1,
    userId: 1,
  },
  {
    unique: true,
  }
);


module.exports = mongoose.model(
  "Rating",
  ratingSchema
);