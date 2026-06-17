const User = require("../models/User");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");
const {
  sendOrderEmail,
  sendLowStockEmail,
 } = require("../services/emailService");

const createOrder = async (req, res) => {
  try {
    const {
      pizza,
      quantity,
      totalPrice,
      razorpayOrderId,
      paymentStatus,
    } = req.body;
    const pizzaDoc = await Pizza.findById(pizza);
    // Reduce inventory
    await Inventory.findOneAndUpdate(
      { itemName: pizzaDoc.cheese },
      { $inc: { stock: -100 * quantity } }
    );

    // Reduce Sauce
    await Inventory.findOneAndUpdate(
      { itemName: pizzaDoc.sauce },
      { $inc: { stock: -50 * quantity } }
    );

    // Reduce Base
    await Inventory.findOneAndUpdate(
      { itemName: pizzaDoc.base },
      { $inc: { stock: -1 * quantity } }
    );

    // Reduce Veggies
    for (const veggie of pizzaDoc.veggies) {
      await Inventory.findOneAndUpdate(
        { itemName: veggie },
        { $inc: { stock: -20 * quantity } }
      );
    }

    const inventoryItems = await Inventory.find();

    for (const item of inventoryItems) {
      if (item.stock < 20) {
        await sendLowStockEmail(
          item.itemName,
          item.stock
        );
      }
    }

    const order = await Order.create({
      user: req.user.id,
      pizza,
      quantity,
      totalPrice,
      razorpayOrderId,
      paymentStatus,
    });
    const user = await User.findById(req.user.id);

    await sendOrderEmail(user.email, order);
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
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
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

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    res.status(200).json({
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

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};