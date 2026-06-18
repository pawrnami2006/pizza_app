const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    base: {
      type: String,
      enum: ["Thin Crust", "Hand Tossed", "Cheese Burst", "Stuffed Crust", "Whole Wheat"],
      required: true,
    },

    sauce: {
      type: String,
      enum: ["Tomato", "BBQ", "Peri Peri", "White Garlic", "Chipotle"],
      required: true,
    },

    cheese: {
      type: String,
      enum: ["Mozzarella", "Cheddar", "Parmesan"],
      required: true,
    },

    veggies: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pizza", pizzaSchema);