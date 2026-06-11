const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

const createOrder = async (req, res) => {
  try {
    const {
      pizza,
      quantity,
      totalPrice,
      razorpayOrderId,
    } = req.body;

    // Reduce inventory
    await Inventory.findOneAndUpdate(
      { itemName: "Mozzarella" },
      { $inc: { stock: -100 * quantity } }
    );

    await Inventory.findOneAndUpdate(
      { itemName: "Tomato Sauce" },
      { $inc: { stock: -50 * quantity } }
    );

    await Inventory.findOneAndUpdate(
      { itemName: "Thin Crust" },
      { $inc: { stock: -1 * quantity } }
    );

    const order = await Order.create({
      user: req.user.id,
      pizza,
      quantity,
      totalPrice,
      razorpayOrderId,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("pizza")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};