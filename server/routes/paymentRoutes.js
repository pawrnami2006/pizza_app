const express = require("express");
const router = express.Router();

const {
  createOrder,
  getKey,
} = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.get("/key", getKey);

module.exports = router;