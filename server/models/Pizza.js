const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    base: {
      type: String,
      enum: ["Thin Crust", "Hand Tossed", "Cheese Burst"],
      required: true,
    },

    sauce: {
      type: String,
      enum: ["Tomato", "BBQ", "Peri Peri"],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pizza", pizzaSchema);