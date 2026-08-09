const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      default: "user1",
    },

    cakeId: {
      type: String,
      required: true,
    },

    cakeName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Basket", basketSchema);