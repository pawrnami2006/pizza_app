const Pizza = require("../models/Pizza");

const createPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.status(201).json({
      message: "Pizza created",
      pizza,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.status(200).json(pizzas);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createPizza,
  getPizzas,
};