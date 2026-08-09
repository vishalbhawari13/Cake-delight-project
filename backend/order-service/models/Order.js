const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    cakeId: String,

    cakeName: String,

    price: Number,

    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "user1",
    },

    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    items: [itemSchema],

    totalAmount: Number,

    status: {
      type: String,
      default: "PLACED",
      enum: [
        "PLACED",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);