const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      pizza,
      quantity,
      totalPrice,
      razorpayOrderId,
    } = req.body;

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